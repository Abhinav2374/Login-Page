# **Login System (Learning Project)**

A basic login system created to practice backend development with **Node.js**, **Express**, and **MongoDB**.

## **Purpose**

This project was built for learning purposes to:

- Understand how to handle user authentication.
- Practice working with forms and data validation.
- Learn to connect a backend to a MongoDB database.
- Use EJS to render dynamic pages.

## **Technologies Used**

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Templating**: EJS

## **How It Works**

1. **Signup:**

   - A user can register by providing a username and password.
   - The username is checked for uniqueness in the database.

2. **Login:**

   - A registered user can log in with valid credentials.
   - On successful login, they are redirected to a welcome page.

3. **Welcome Page:**
   - Displays a personalized greeting using the username.

## **Running the Project**

1. Clone the repository and install the required npm packages:

   ```bash
   git clone https://github.com/Abhinav2374/Login-Page.git
   cd Login-Page
   npm install

   ```

2. Run the Apllication

   ```bash
   npm start

   ```

3. Access the application
   ```bash
   http://localhost:3000
   ```

## **DISCLAIMER**

This project is for learning purposes only and is not production-ready.
It lacks critical security features such as:

- Password hashing
- Input sanitization
- Secure authentication mechanisms
