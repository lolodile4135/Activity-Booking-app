This is a full-stack application that allows users to view, book, and manage activities. The backend is built with Node.js, Express, and MongoDB while the front-end interacts with the API. This app is designed to manage activity bookings for authenticated users.




User Authentication: Users can register, log in, and access their accounts.




Activity Listings: Users can view all available activities.

Activity Booking: Authenticated users can book an activity and save the booking information.

Booking History: Users can view all of their past bookings.

Tech Stack


Backend: Node.js, Express

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Environment Variables: Used for storing sensitive information like JWT secret and MongoDB URI.



API Endpoints


1. User Authentication


POST     /api/auth/register: Register a new user.

POST     /api/auth/login: Log in an existing user and receive a JWT token.

2. Activities

   GET /api/activities/add : add activities as admin.


4. Bookings


POST /api/user/book/:activityId : Book an activity (only authenticated users).

GET /api/user/mybooking : Get all bookings of a specific user (authenticated users only).




