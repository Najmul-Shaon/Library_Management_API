# 📚 Library Management API

A RESTful backend service for managing a digital library system. Built using **Node.js**, **TypeScript**, **Express**, and **MongoDB**, this API allows clients to manage books, borrow books, and check borrowing status.

🚀 **Live API**: [https://library-management-api-navy-two.vercel.app](https://library-management-api-navy-two.vercel.app)

---

## 📖 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)
- [License](#license)

---

## ✨ Features

- Add new books to the library
- Retrieve all books
- Retrieve a specific book by ID
- Update a specific book's details
- Delete a book
- Borrow a book
- Check book borrowing status

---

## ⚙️ Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd library_management_api

# Install dependencies
npm install

## ▶️ Usage

```bash
# To start the development server:
npm run dev


## 🧪 Examples

### Create a New Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
#### Response:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

* * *

### 2\. Get All Books

**GET** `/api/books`

Supports filtering, and sorting.

#### Example Query:

`/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

#### Query Parameters:

*   `filter`: Filter by genre
*   `sort`: `asc` or `desc`
*   `limit`: Number of results (default: 10)

#### Response:

```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```

* * *

### 3\. Get Book by ID

**GET** `/api/books/:bookId`

#### Response:

```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

* * *

### 4\. Update Book

**PUT** `/api/books/:bookId`

#### Request:

```json
{
  "copies": 50
}
```

#### Response:

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```

* * *

### 5\. Delete Book

**DELETE** `/api/books/:bookId`

#### Response:

```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```

* * *

### 6\. Borrow a Book

**POST** `/api/borrow`

#### Business Logic:

*   Verify the book has enough available copies.
*   Deduct the requested quantity from the book’s copies.
*   If copies become 0, update `available` to `false` (implement this using a static method or instance method).
*   Save the borrow record with all relevant details.

#### Request:

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Response:

```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```

* * *

### 7\. Borrowed Books Summary (Using Aggregation)

`GET /api/borrow`

**Purpose:**

Return a summary of borrowed books, including:

*  Total borrowed quantity per book (`totalQuantity`)
*    Book details: `title` and `isbn`

**Details:**

Use MongoDB aggregation pipeline to:

*  Group borrow records by book
*   Sum total quantity borrowed per book
*   Return book info and total borrowed quantity

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

