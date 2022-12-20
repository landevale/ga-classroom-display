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
   1.1. Test to filter from DB by Date & Class to get Cohort (e.g SEi40)
   1.2. Map onto <td> table use [IF-"Sun"] logic to mutate array

2. Login and hash password

3. Write logic to check whether classroom @date/time is booked or not. IF(booked), display booking, ELSE display original cohort details if present

## Notes:

Min-width for calendarDisplay component is on Ln 172 (change the value to change the width of the table)

To-dos

1. Alt Sat Logic
2. Fix the “routes” for all “displays” (I.e calendarDisplay / courseReg display)
3. Fix the daysOnCampus structure (remove the days(level?)) Change to use formic to recognise an array of dates
4. Set the displayPage (for classroom display) -> Using id: params

Check whether cohort is completed and want to
Try to make it server-side code (/?)
Fetch and first-level filter those course-past dates
Does kerin need past bookings(?)

//====================

To-dos

1. Alt Sat Logic
2. Fix the “routes” for all “displays” (I.e calendarDisplay / courseReg display)
3. Fix the daysOnCampus structure (remove the days(level?)) Change to use formic to recognise an array of dates
4. Set the displayPage (for classroom display) -> Using id: params
5. Trim some stuff
6. Hidden dropdown for classrooms(?) / Favourite the URL

Check whether cohort is completed and want to
Try to make it server-side code (/?)
Fetch and first-level filter those course-past dates
Does kerin need past bookings(?)

Calendar Display Logic

1. Create an empty array

2. Set state for user-chosen-date (selectedDateState)
3. Check for Cohort (Update Array using selectedDateState to selectedDateState +6)
   Check for whether selectedDateState falls within start and end date of each cohort-entry in database
4. Check for Sunday (Update Array)
   Check for whether selectedDateState is a Sunday
5. Check for Manual Booking (Update Array)
6. Check for Holiday (Update Array)
