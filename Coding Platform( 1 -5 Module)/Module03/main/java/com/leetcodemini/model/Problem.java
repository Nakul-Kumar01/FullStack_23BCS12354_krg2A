package com.leetcodemini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "problem")
public class Problem {
    @Id
    public String id;
    public String title;
    public String discription;
    public String difficulty;
    public List<String> tags;
    public boolean bookMark;
    public List<StartCode> startCode;
    public List<String> companies;
    public List<String> hint;
    public List<TestCase> visibleTestCases;
    public List<TestCase> hiddenTestCases;
    public List<ReferenceSolution> referenceSolution;
    public String problemCreator;
}
