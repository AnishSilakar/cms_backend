# cms_backend
This repo is created on Node.js Express with Sequelize ORM, and this is the CMS website backend module.

### **Table of Contents**
1. Introduction 
2. Features 
3. Requirements 
4. Installation


### **Introduction**

Welcome to the Node.js CMS Starter Template! This project provides a foundation for building a Content Management System using Express.js, MySQL, and Sequelize ORM. 
It includes essential components for managing users, posts, categories, and comments.

### **Features**
1. User authentication and management 
2. Category , Page and Multiple management
3. Multiple Image Handling
4. Data caching 
5. RESTful API endpoints 
6. Database migrations and seeders
7. Transaction Management

### **Requirements**
* Node.js (version 14.x or higher)
* MySQL server
* npm (comes bundled with Node.js)

### **Installation**

1. Clone the repository: `git clone https://github.com/yourusername/node-cms-starter.git`
2. Navigate to the project directory: `cd node-cms-starter `
3. Install dependencies: `npm install `
4. Create a .env file in the root directory and add your database credentials:
   PORT=3000
   JWT_SECRET=secret
5. Initialize the Sequelize CLI: `npx sequelize-cli init`
6. Edit the db connection data in config/config.json file:
   "username": "root",
   "password": "",
   "database": "nodejs_db",
   "host": "127.0.0.1",
   "dialect": "mysql"
6. Run migrations: `npx sequelize-cli db:migrate `
7. Run seeders: `npx sequelize-cli db:seed:all`
8. To start the server: `npm run dev`

The application will be available at http://localhost:3000.

### **Steps to Generate an App Password for Gmail**
1.	Enable 2-Step Verification (if not already done):
   o	Go to your Google Account: https://myaccount.google.com/
   o	On the left-hand side, select Security.
   o	Under the "Signing in to Google" section, click on 2-Step Verification.
   o	Follow the instructions to set it up if you haven’t already.
2.	Generate an App Password:
   o	Once 2-Step Verification is enabled, go back to the Security section in your Google Account.
   o	Under "Signing in to Google", you will see App Passwords.
   o	Click on App Passwords (you may be asked to sign in again).
3.	Select the App and Device:
   o	From the Select app drop-down menu, choose the app you need the password for (e.g., Gmail, Mail, etc.).
   o	From the Select device drop-down menu, choose the device you're using or select Other (Custom name) to give a custom name (e.g., "Outlook on Windows").
4.	Generate the Password:
   o	After selecting the app and device, click Generate.
   o	Google will generate a 16-character app password.
   o	Copy the password (it will look like a random set of characters, e.g., abcd efgh ijkl mnop).

### **Steps to Map Gmail Access In Cms Application**
1. Find the .env file and define the following properties
   a.	EMAIL_NAME= your_emaill address
   b.	EMAIL_PASSWORD=app_password_you_created 

