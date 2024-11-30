# Command API

## Overview
A robust API to store and search shell commands across systems.

## Prerequisites
- Docker
- Docker Compose

## Configuration
1. Ensure you have the following files in your project root:
   - `Dockerfile`
   - `docker-compose.yml`
   - `.env` (optional, for local development)

## Environment Variables
The application uses `DATABASE_URL` for database connection:
- In Docker Compose: Configured in the `docker-compose.yml`
- Locally: Create a `.env` file with:
  ```
  DATABASE_URL=postgresql://username:password@localhost:5432/command_db?schema=public
  ```

## Running the Application

### Using Docker Compose
```bash
# Build and start the services
docker-compose up --build

# To run in detached mode
docker-compose up -d --build
```

### Stopping the Application
```bash
docker-compose down
```

## API Endpoints

### Store a Command
```bash
# Using curl
curl -X POST http://localhost:8080/api/v1/commands \
     -H "Content-Type: application/json" \
     -d '{"command":"ls -l"}'

# Or with form-urlencoded
curl -X POST http://localhost:8080/api/v1/commands \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "command=ls -l"
```

### Search Commands
```bash
curl "http://localhost:8080/api/v1/commands?keyword=ls"
```

## Development
- Install dependencies: `npm install`
- Generate Prisma client: `npx prisma generate`
- Run migrations: `npx prisma migrate deploy`