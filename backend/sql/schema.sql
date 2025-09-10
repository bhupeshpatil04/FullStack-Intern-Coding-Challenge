-- MySQL schema for store_ratings
CREATE DATABASE IF NOT EXISTS store_ratings;
USE store_ratings;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  address VARCHAR(500),
  password VARCHAR(200) NOT NULL,
  role ENUM('admin','user','owner') DEFAULT 'user',
  createdAt DATETIME,
  updatedAt DATETIME
);

CREATE TABLE IF NOT EXISTS Stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150),
  address VARCHAR(500),
  ownerId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (ownerId) REFERENCES Users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS Ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  value INT NOT NULL,
  userId INT,
  storeId INT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (storeId) REFERENCES Stores(id) ON DELETE CASCADE
);
