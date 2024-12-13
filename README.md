# cms_backend
This repo is created on Node.js Express with Sequelize ORM, and this is the CMS website backend module.

Table of Contents
Introduction
Features
Requirements
Installation
Usage
Contributing
License
Introduction
Welcome to the Node.js CMS Starter Template! This project provides a foundation for building a Content Management System using Express.js, MySQL, and Sequelize ORM. It includes essential components for managing users, posts, categories, and comments.

Features
User authentication and management
Post creation, editing, and deletion
Category management
Comment system for posts
Admin dashboard
RESTful API endpoints
Database migrations and seeders
Requirements
Node.js (version 14.x or higher)
MySQL server
npm (comes bundled with Node.js)
Installation
Clone the repository:
git clone https://github.com/AnishSilakar/cms_backend
Navigate to the project directory:
cd node-cms-starter
Install dependencies:
npm install
Create a .env file in the root directory and add your database credentials:
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
Initialize the Sequelize CLI:
npx sequelize-cli init
Run migrations:
npx sequelize-cli db:migrate
Run seeders:
npx sequelize-cli db:seed:all
Usage
To start the server:

npm run dev
The application will be available at http://localhost:3000.
