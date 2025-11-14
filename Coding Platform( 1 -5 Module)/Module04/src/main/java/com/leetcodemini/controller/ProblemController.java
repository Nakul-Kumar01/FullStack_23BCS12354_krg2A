package com.leetcodemini.controller;

import com.leetcodemini.model.Problem;
import com.leetcodemini.repository.ProblemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@RestController
@RequestMapping("/problem")
public class ProblemController {

    @Autowired
    private ProblemRepository problemRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createProblem(@RequestBody Problem p, HttpServletRequest req) {
        String userId = (String) req.getAttribute("userId");
        if (userId == null) return ResponseEntity.status(401).body("Unauthorized");
        p.problemCreator = userId;
        problemRepository.save(p);
        return ResponseEntity.ok(p);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProblem(@PathVariable String id) {
        Optional<Problem> opt = problemRepository.findById(id);
        if (opt.isEmpty()) return ResponseEntity.status(404).body("Not found");
        return ResponseEntity.ok(opt.get());
    }

    @GetMapping("/all")
    public ResponseEntity<?> allProblems() {
        return ResponseEntity.ok(problemRepository.findAll());
    }
}
