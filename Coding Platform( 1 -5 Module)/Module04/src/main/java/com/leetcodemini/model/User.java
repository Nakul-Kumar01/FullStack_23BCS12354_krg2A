package com.leetcodemini.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "user")
public class User {
    @Id
    public String id;
    public String username;
    public String email;
    public String passwordHash;
    public List<String> problemSolved = new ArrayList<>();
}
