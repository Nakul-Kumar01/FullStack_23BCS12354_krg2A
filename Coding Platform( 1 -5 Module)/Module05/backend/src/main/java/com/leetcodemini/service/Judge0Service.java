package com.leetcodemini.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.Base64;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class Judge0Service {

    @Value("${judge0.api.url}")
    private String apiUrl;
    @Value("${judge0.api.key}")
    private String apiKey;
    @Value("${judge0.api.host}")
    private String apiHost;

    private final WebClient client = WebClient.builder().build();

    public Mono<List<Map<String, Object>>> submitBatch(List<Map<String,Object>> submissions) {
        String uri = apiUrl + "/submissions/batch?base64_encoded=false";
        return client.post()
                .uri(uri)
                .header("x-rapidapi-key", apiKey)
                .header("x-rapidapi-host", apiHost)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("submissions", submissions))
                .retrieve()
                .bodyToMono(List.class);
    }

    public Mono<List<Map<String,Object>>> getSubmissionResults(List<String> tokens) {
        if (tokens == null || tokens.isEmpty()) return Mono.just(Collections.emptyList());
        String joined = String.join(",", tokens);
        String uri = apiUrl + "/submissions/batch?tokens=" + joined + "&base64_encoded=true&fields=*";

        // Polling loop: repeatedly fetch until all done
        return Mono.fromCallable(() -> {
            while (true) {
                Map resp = client.get()
                        .uri(uri)
                        .header("x-rapidapi-key", apiKey)
                        .header("x-rapidapi-host", apiHost)
                        .retrieve()
                        .bodyToMono(Map.class)
                        .block();

                if (resp == null || resp.get("submissions") == null) {
                    TimeUnit.MILLISECONDS.sleep(500);
                    continue;
                }

                List<Map<String,Object>> subs = (List<Map<String,Object>>) resp.get("submissions");
                // decode base64 fields
                List<Map<String,Object>> decoded = subs.stream().map(s -> {
                    Map<String,Object> out = new HashMap<>(s);
                    out.put("stdout", decodeBase64Field((String) s.get("stdout")));
                    out.put("stderr", decodeBase64Field((String) s.get("stderr")));
                    out.put("compile_output", decodeBase64Field((String) s.get("compile_output")));
                    out.put("message", decodeBase64Field((String) s.get("message")));
                    return out;
                }).collect(Collectors.toList());

                boolean allDone = decoded.stream()
                        .allMatch(d -> {
                            Object sid = d.get("status_id");
                            if (sid instanceof Number) return ((Number) sid).intValue() > 2;
                            return false;
                        });

                if (allDone) return decoded;
                TimeUnit.MILLISECONDS.sleep(500);
            }
        });
    }

    private String decodeBase64Field(String field) {
        if (field == null) return null;
        try {
            byte[] bytes = Base64.getDecoder().decode(field);
            return new String(bytes);
        } catch (IllegalArgumentException e) {
            return field;
        }
    }
}
