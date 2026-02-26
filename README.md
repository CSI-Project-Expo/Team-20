# Team-20

## Overview

Smart Job Analyzer is a full-stack web application consisting of a backend (Node.js/Express with Prisma ORM) and a frontend (React with Vite and Tailwind CSS). The project is organized for easy development and deployment, supporting user authentication, admin dashboards, and role/roadmap management.

## Folder Structure

```
Team-20/
├── backend/         # Node.js backend with Express and Prisma
│   ├── package.json
│   ├── prisma/      # Prisma schema, migrations, and seed scripts
│   ├── generated/   # Auto-generated Prisma client code
│   └── src/         # Express app source code
├── frontend/        # React frontend (Vite + Tailwind CSS)
│   ├── package.json
│   ├── src/         # React app source code
│   └── ...
├── run.ps1          # PowerShell script to run the project
└── README.md        # Project documentation
```

## Backend Setup

1. **Install dependencies:**
	```sh
	cd backend
	npm install
	```

2. **Configure the database:**
	- Edit `backend/prisma/schema.prisma` with your database connection string.

3. **Run migrations:**
	```sh
	npx prisma migrate deploy
	```

4. **Seed the database (optional):**
	```sh
	bun run prisma/seed.js
	```

5. **Start the backend server:**
	```sh
	npm start
	```

## Frontend Setup

1. **Install dependencies:**
	```sh
	cd frontend
	npm install
	```

2. **Start the development server:**
	```sh
	npm run dev
	```

3. **Open the app:**
	- Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

- `run.ps1`: PowerShell script to automate project setup or run tasks.

## Technologies Used

- **Backend:** Node.js, Express, Prisma ORM, SQLite/PostgreSQL (configurable)
- **Frontend:** React, Vite, Tailwind CSS

