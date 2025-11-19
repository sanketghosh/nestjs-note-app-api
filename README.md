# NestJS Note-Taking API

A simple, RESTful note-taking API built with **NestJS**, featuring **Swagger/OpenAPI** documentation for easy testing and integration.

---

## Features

| Feature               | Description                                            |
| --------------------- | ------------------------------------------------------ |
| **CRUD Operations**   | Create, Read, Update, and Delete notes                 |
| **Swagger Docs**      | Interactive API documentation at `/api`                |
| **Validation**        | Request body validation using DTOs and class-validator |
| **TypeScript**        | Fully typed codebase for better maintainability        |
| **Modular Structure** | Organized by feature (notes) for scalability           |

---

## Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL (or your preferred database)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/nestjs-note-taking-api.git
   cd nestjs-note-taking-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials.

4. Run the database migrations (if applicable):

   ```bash
   npm run migration:run
   ```

5. Start the development server:
   ```bash
   npm run start:dev
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

| Directory/File      | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `src/notes/`        | Notes module (controllers, services, DTOs) |
| `src/database/`     | Database configuration and entities        |
| `src/main.ts`       | Application entry point and Swagger setup  |
| `src/app.module.ts` | Root application module                    |

---

## Usage

### Create a Note

```bash
POST /notes
{
  "title": "My First Note",
  "content": "This is a sample note."
}
```

### Get All Notes

```bash
GET /notes
```

### Get a Single Note

```bash
GET /notes/:id
```

### Update a Note

```bash
PATCH /notes/:id
{
  "title": "Updated Title"
}
```

### Delete a Note

```bash
DELETE /notes/:id
```

---

## License

MIT

```
---
**Tip:** Replace `yourusername` with your GitHub username and customize the database setup, project structure, and usage examples as needed. Want me to add a section on testing or deployment? Let me know!
```
