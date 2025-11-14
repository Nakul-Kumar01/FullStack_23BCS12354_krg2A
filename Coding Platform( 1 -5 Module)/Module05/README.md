[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/CE8vDSLA)

# LeetCode Mini - Spring Boot Backend (Full)

This ready-to-run Spring Boot backend includes:
- User registration & login (JWT)
- Problem CRUD (create/get/list)
- Submissions: run (visible testcases) and submit (hidden testcases)
- Submission persistence + update after Judge0 returns results

## Setup

1. Install Java 17, Maven, and MongoDB.
2. Update `src/main/resources/application.properties`:
   - `judge0.api.key` — set your RapidAPI key for Judge0.
   - `jwt.secret` — set to a long random string.
3. Start MongoDB (default URI in properties).
4. Run:
   ```
   mvn spring-boot:run
   ```
5. Endpoints
   - `POST /user/register` { username, email, password } -> { token }
   - `POST /user/login` { email, password } -> { token }
   - `POST /problem/create` (Authorization: Bearer <token>) -> create problem
   - `GET  /problem/all`
   - `POST /submission/run/{problemId}` (Authorization) { code, language }
   - `POST /submission/submit/{problemId}` (Authorization) { code, language }
   - `GET  /submission/mine` (Authorization)

The backend mirrors behavior of your Node.js app and persists submissions & users in MongoDB.

If you want, I can:
- Add Redis caching (like your Node app)
- Add integration tests
- Seed the DB with example problems
