# NestJS Note-Taking API

A simple, RESTful note-taking API built with **NestJS**, featuring **Swagger/OpenAPI** documentation for easy testing and integration.

---

## Features

| Feature                | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **CRUD Operations**    | Create, Read, Update, and Delete notes                 |
| **JWT Authentication** | User registration and login                            |
| **Swagger Docs**       | Interactive API documentation at `/api`                |
| **Validation**         | Request body validation using DTOs and class-validator |
| **TypeScript**         | Fully typed codebase for better maintainability        |
| **Modular Structure**  | Organized by feature (notes) for scalability           |

---

## Prerequisites

- Node.js
- pnpm
- SQLite (or your preferred database)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sanketghosh/nestjs-note-app-api.git
   cd nestjs-note-app-api
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials.

4. Run the database migrations (if applicable):

   ```bash
   pnpm run migration:run
   ```

5. Start the development server:
   ```bash
   pnpm run start:dev
   ```

---

## API Documentation

After starting the server, visit:

```
http://localhost:3000/api
```

to access the **Swagger UI** and interact with the API.

---

## Project Structure

| Directory/File      | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `src/auth/`         | Auth module                               |
| `src/user/`         | User module                               |
| `src/note/`         | Note module                               |
| `src/prisma/`       | Prisma configuration                      |
| `src/main.ts`       | Application entry point and Swagger setup |
| `src/app.module.ts` | Root application module                   |

---

## Usage

## Health Check

### Endpoint

```http
GET http://localhost:3000
```

### Description

Verify that the API server is running.

---

## User Authentication

### **1. User Registration**

#### Endpoint

```http
POST http://localhost:3000/api/v1/auth/register
```

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "name": "Jay Sharma",
  "email": "jays@mail.com",
  "password": "JayPass@123"
}
```

#### Response

- **201 Created**: If registration is successful.

### **2. User Login**

#### Endpoint

```http
POST http://localhost:3000/api/v1/auth/login
```

#### Request Headers

```
Content-Type: application/json
```

#### Request Body

```json
{
  "email": "jays@mail.com",
  "password": "JayPass@123"
}
```

#### Response

- **200 OK**: Returns authentication token if login is successful.

---

## Notes Management

### **3. Create a Note**

#### Endpoint

```http
POST http://localhost:3000/api/v1/notes
```

#### Request Headers

```
Content-Type: application/json
Authorization: Bearer <your_token>
```

#### Request Body

```json
{
  "title": "Note 1",
  "body": "This is just the body of note one."
}
```

#### Response

- **201 Created**: When the note is successfully created.

### **4. Fetch All Notes**

#### Endpoint

```http
GET http://localhost:3000/api/v1/notes
```

#### Request Headers

```
Content-Type: application/json
Authorization: Bearer <your_token>
```

#### Response

- **200 OK**: Returns an array of notes.

### **5. Get Single Note**

#### Endpoint

```http
GET http://localhost:3000/api/v1/notes/<note_id>
```

#### Request Headers

```
Content-Type: application/json
Authorization: Bearer <your_token>
```

#### Response

- **200 OK**: Returns the specified note.

### **6. Update a Note**

#### Endpoint

```http
PATCH http://localhost:3000/api/v1/notes/<note_id>
```

#### Request Headers

```
Content-Type: application/json
Authorization: Bearer <your_token>
```

#### Request Body

```json
{
  "title": "note 5",
  "body": "small desc for note 5"
}
```

#### Response

- **200 OK**: If the note is successfully updated.

### **7. Delete a Note**

#### Endpoint

```http
DELETE http://localhost:3000/api/v1/notes/<note_id>
```

#### Request Headers

```
Content-Type: application/json
Authorization: Bearer <your_token>
```

#### Response

- **204 No Content**: If the note is successfully deleted.

---

## Notes

- Replace `<your_token>` with the actual Bearer token obtained from login.
- Replace `<note_id>` with the actual note ID for get, update, and delete operations.
