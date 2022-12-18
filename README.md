# Project 3

Server cannot crash or return nothing
Document all the endpoints + responses + http status codes

Clear the idea with Simon/Faith
Do the wireframes + Data -> Collections (documents example) in a google sheet

## Login (Sessions)

get a specific user -> GET /users/:id

- Client - form (userid, password) -> Fire off Request GET
- Server
  - extract userid and password from `req.body`
  - if statement to check -> if userid exists in database
    - True -> allow user to continue -> Goto next if check
    - False -> not allow -> send back error message (User not found)
  - if statement -> if password matches
    - True -> allow user to continue -> send back User info (200)
    - False -> not allow -> send back error message / 401
- Database - store User (userid, password) -> User Collection <-mongoose (Schema)

Authentication (Login) & Authorization

## Hashing

ClearText -> Hashing Algo / Function -> Hash

123 --> abs349i9fewskfklewjkfklewdkoke
123 --> abs349i9fewskfklewjkfklewdkoke

- Given the same input -> output always the same
- Hashing is 1 way -> CANNOT reverse the hash
- Hashing is quite fast

## Register

Create a new user (same as creating fruit)

Form (inputs) -> POST /users (body as JSON) [Request]> Extract body -> Insert into database -> send User JSON


## To-dos:
1. Seed data (temp, booking.js)
  1.1.  Test to filter from DB by Date & Class to get Cohort (e.g SEi40)
  1.2.  Map onto <td> table use [IF-"Sun"] logic to mutate array

2. Login and hash password

3. Write logic to check whether classroom @date/time is booked or not. IF(booked), display booking, ELSE display original cohort details if present


## Notes:
Min-width for calendarDisplay component is on Ln 172 (change the value to change the width of the table)