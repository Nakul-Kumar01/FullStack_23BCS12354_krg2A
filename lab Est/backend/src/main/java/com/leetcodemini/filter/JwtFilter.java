package com.leetcodemini.filter;

import com.leetcodemini.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        String auth = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (auth != null && auth.startsWith("Bearer ")) {
            String token = auth.substring(7);
            try {
                String userId = jwtUtil.validateAndGetUserId(token);
                // set as request attribute for controllers to use
                req.setAttribute("userId", userId);
            } catch (Exception e) {
                // ignore invalid token; controllers can still reject if userId missing
            }
        }
        chain.doFilter(request, response);
    }
}
