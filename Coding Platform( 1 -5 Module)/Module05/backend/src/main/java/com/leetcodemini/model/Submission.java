package com.leetcodemini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document(collection = "submission")
public class Submission {
    @Id
    public String id;
    public String userId;
    public String problemId;
    public String code;
    public String language;
    public int testCasesPassed;
    public int testCasesTotal;
    public Object status; // store Judge0 status object or message
    public String errorMessage;
    public double runtime;
    public int memory;
    public Instant createdAt = Instant.now();
}
