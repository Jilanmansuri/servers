# 📘 Users Server API Documentation

## 📌 Project Overview

This project is a simple **User Management REST API** built using **Node.js** and **Express.js**.  
It supports full CRUD operations:

- Get all users
- Get user by UID
- Create user
- Update user (PUT)
- Partial update user (PATCH)
- Delete user

---

## 🚀 Base URL

http://localhost:3000

yaml
Copy code

---

## 📂 User Object Structure

Each user contains the following fields:

| Field     | Type   | Description |
|-----------|--------|-------------|
| att       | Number | Attendance |
| uid       | Number | Unique User ID |
| totalsub  | Number | Total Submissions |
| bonus     | Number | Bonus Points |
| name      | String | User Name |

---

## 🔹 1. Get All Users

**Method:** `GET`  
**Endpoint:** `/user`

### Example URL
http://localhost:3000/user

bash
Copy code

### ✅ Success Response (200 OK)

```json
[
  {
    "att": 80,
    "uid": 108623,
    "totalsub": 12,
    "bonus": 20,
    "name": "jilan"
  }
]
🔹 2. Get User By UID
Method: GET
Endpoint: /user/:uid

Example
bash
Copy code
http://localhost:3000/user/108623
✅ Success Response (200 OK)
json
Copy code
{
  "att": 80,
  "uid": 108623,
  "totalsub": 12,
  "bonus": 20,
  "name": "jilan"
}
❌ Error Response (404 Not Found)
json
Copy code
{
  "message": "User not found"
}
🔹 3. Create New User
Method: POST
Endpoint: /user

Example URL
bash
Copy code
http://localhost:3000/user
📥 Request Body (JSON)
json
Copy code
{
  "att": 75,
  "uid": 109000,
  "totalsub": 10,
  "bonus": 15,
  "name": "rahul"
}
✅ Success Response (201 Created)
json
Copy code
{
  "message": "User created",
  "user": {
    "att": 75,
    "uid": 109000,
    "totalsub": 10,
    "bonus": 15,
    "name": "rahul"
  }
}
🔹 4. Update User (Full Replace)
Method: PUT
Endpoint: /user/:uid

Example
bash
Copy code
http://localhost:3000/user/108623
📥 Request Body (All fields required)
json
Copy code
{
  "att": 90,
  "totalsub": 20,
  "bonus": 50,
  "name": "jilan updated"
}
✅ Success Response (200 OK)
json
Copy code
{
  "message": "User replaced",
  "user": {
    "att": 90,
    "uid": 108623,
    "totalsub": 20,
    "bonus": 50,
    "name": "jilan updated"
  }
}
❌ Error Response (404 Not Found)
json
Copy code
{
  "message": "User not found"
}
🔹 5. Update User (Partial Update)
Method: PATCH
Endpoint: /user/:uid

Example
bash
Copy code
http://localhost:3000/user/108623
📥 Request Body (Only fields to update)
json
Copy code
{
  "bonus": 99
}
✅ Success Response (200 OK)
json
Copy code
{
  "message": "User partially updated",
  "user": {
    "att": 80,
    "uid": 108623,
    "totalsub": 12,
    "bonus": 99,
    "name": "jilan"
  }
}
❌ Error Response (404 Not Found)
json
Copy code
{
  "message": "User not found"
}
🔹 6. Delete User
Method: DELETE
Endpoint: /user/:uid

Example
bash
Copy code
http://localhost:3000/user/108623
✅ Success Response (200 OK)
json
Copy code
{
  "message": "User deleted successfully",
  "user": {
    "att": 80,
    "uid": 108623,
    "totalsub": 12,
    "bonus": 20,
    "name": "jilan"
  }
}
❌ Error Response (404 Not Found)
json
Copy code
{
  "message": "User not found"
}
🛠 How to Run the Project
1️⃣ Install Dependencies
nginx
Copy code
npm install
2️⃣ Start the Server
nginx
Copy code
node index.js
3️⃣ Server will run at:
arduino
Copy code
http://localhost:3000
📌 Technologies Used
Node.js

Express.js

Postman (for API testing)

✅ Features
RESTful API design

Proper HTTP status codes

Error handling

JSON request & response

Full CRUD operations