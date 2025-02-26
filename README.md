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
