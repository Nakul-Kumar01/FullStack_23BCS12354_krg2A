package com.leetcodemini.controller;

import com.leetcodemini.model.Problem;
import com.leetcodemini.model.Submission;
import com.leetcodemini.model.User;
import com.leetcodemini.repository.ProblemRepository;
import com.leetcodemini.repository.SubmissionRepository;
import com.leetcodemini.repository.UserRepository;
import com.leetcodemini.service.Judge0Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/submission")
public class SubmissionController {

    @Autowired
    private ProblemRepository problemRepository;
    @Autowired
    private Judge0Service judge0Service;
    @Autowired
    private SubmissionRepository submissionRepository;
    @Autowired
    private UserRepository userRepository;

    private int getIdByLanguage(String language) {
        if (language == null) return 71;
        switch (language.toLowerCase()) {
            case "cpp":
            case "c++":
                return 54;
            case "java":
                return 62;
            case "javascript":
            case "js":
                return 63;
            case "python":
                return 71;
            default:
                return 71;
        }
    }

    @PostMapping("/run/{id}")
    public Mono<ResponseEntity<?>> runCode(@PathVariable String id, @RequestBody Map<String,String> body, HttpServletRequest req) {
        String code = body.get("code");
        String language = body.get("language");
        String userId = (String) req.getAttribute("userId");
        if (userId == null) return Mono.just(ResponseEntity.status(401).body("Unauthorized"));
        if (code == null || language == null) return Mono.just(ResponseEntity.badRequest().body("code and language required"));

        Optional<Problem> opt = problemRepository.findById(id);
        if (opt.isEmpty()) return Mono.just(ResponseEntity.status(404).body("Problem not found"));
        Problem problem = opt.get();

        List<Map<String,Object>> submissions = new ArrayList<>();
        if (problem.visibleTestCases != null) {
            problem.visibleTestCases.forEach(tc -> {
                Map<String,Object> sub = new HashMap<>();
                sub.put("source_code", code);
                sub.put("language_id", getIdByLanguage(language));
                sub.put("stdin", tc.input);
                sub.put("expected_output", tc.output);
                submissions.add(sub);
            });
        }

        return judge0Service.submitBatch(submissions)
                .flatMap(tokensList -> {
                    List<String> tokens = (List<String>) ((List) tokensList).stream()
                            .map(t -> ((Map) t).get("token").toString())
                            .collect(Collectors.toList());
                    return judge0Service.getSubmissionResults(tokens);
                })
                .map(results -> ResponseEntity.ok(results))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body("Judge0 error: " + e.getMessage())));
    }

    @PostMapping("/submit/{id}")
    public Mono<ResponseEntity<?>> submitCode(@PathVariable String id, @RequestBody Map<String,String> body, HttpServletRequest req) {
        String code = body.get("code");
        String language = body.get("language");
        String userId = (String) req.getAttribute("userId");
        if (userId == null) return Mono.just(ResponseEntity.status(401).body("Unauthorized"));
        if (code == null || language == null) return Mono.just(ResponseEntity.badRequest().body("code and language required"));

        Optional<Problem> opt = problemRepository.findById(id);
        if (opt.isEmpty()) return Mono.just(ResponseEntity.status(404).body("Problem not found"));
        Problem problem = opt.get();

        // Create submission doc with pending status
        Submission subDoc = new Submission();
        subDoc.userId = userId;
        subDoc.problemId = id;
        subDoc.code = code;
        subDoc.language = language;
        subDoc.testCasesPassed = 0;
        subDoc.testCasesTotal = problem.hiddenTestCases != null ? problem.hiddenTestCases.size() : 0;
        subDoc.status = Map.of("id", -1, "description", "pending");
        submissionRepository.save(subDoc);

        List<Map<String,Object>> submissions = new ArrayList<>();
        if (problem.hiddenTestCases != null) {
            problem.hiddenTestCases.forEach(tc -> {
                Map<String,Object> s = new HashMap<>();
                s.put("source_code", code);
                s.put("language_id", getIdByLanguage(language));
                s.put("stdin", tc.input);
                s.put("expected_output", tc.output);
                submissions.add(s);
            });
        }

        return judge0Service.submitBatch(submissions)
                .flatMap(tokensList -> {
                    List<String> tokens = (List<String>) ((List) tokensList).stream()
                            .map(t -> ((Map) t).get("token").toString())
                            .collect(Collectors.toList());
                    return judge0Service.getSubmissionResults(tokens);
                })
                .map(results -> {
                    // aggregate results
                    int passed = 0;
                    double runtime = 0.0;
                    int memory = 0;
                    Object status = null;
                    String compileErr = null;
                    for (Object o : results) {
                        Map r = (Map) o;
                        Number sid = (Number) r.get("status_id");
                        if (sid != null && sid.intValue() == 3) {
                            passed++;
                            String time = (String) r.get("time"); // time is string sometimes
                            try { runtime += Double.parseDouble(time); } catch (Exception ignored){}
                            Object mem = r.get("memory");
                            if (mem instanceof Number) memory = Math.max(memory, ((Number) mem).intValue());
                        } else {
                            status = r.get("status");
                            compileErr = (String) r.get("compile_output");
                        }
                    }
                    if (status == null) status = Map.of("id", 3, "description", "Accepted");
                    // update submission doc
                    subDoc.testCasesPassed = passed;
                    subDoc.runtime = runtime;
                    subDoc.memory = memory;
                    subDoc.status = status;
                    subDoc.errorMessage = compileErr;
                    submissionRepository.save(subDoc);

                    // if accepted fully, add to user's solved list
                    if (passed == subDoc.testCasesTotal) {
                        Optional<User> uopt = userRepository.findById(userId);
                        if (uopt.isPresent()) {
                            User u = uopt.get();
                            if (!u.problemSolved.contains(id)) {
                                u.problemSolved.add(id);
                                userRepository.save(u);
                            }
                        }
                    }

                    return ResponseEntity.ok(subDoc);
                })
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body("Judge0 error: " + e.getMessage())));
    }

    @GetMapping("/mine")
    public ResponseEntity<?> mySubmissions(HttpServletRequest req) {
        String userId = (String) req.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        List<Submission> subs = submissionRepository.findByUserId(userId);
        return ResponseEntity.ok(subs);
    }
}
