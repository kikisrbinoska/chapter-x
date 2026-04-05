# ChapterX

## About

ChapterX is an AI-powered creative writing platform that integrates writing assistance, collaborative tools, and social networking features to help writers increase their productivity. Each chapter includes a rating system so authors can receive continuous feedback on their work. Writers get full control over their stories through a comprehensive user system, with profile analytics showing follower growth and AI-generated suggestions to improve writing quality.

The platform consolidates all essential writing operations into a single environment — from managing private drafts and collaborating with others, to publishing stories and engaging with readers. Real-time feedback from the community enables writers to improve their work continuously, while an intuitive interface adapts to different user types and skill levels.

### User Types

| Role | Access |
|------|--------|
| **Regular User** | Browse and read public stories, leave comments and likes |
| **Writer** | Create and manage stories, access private drafts, collaboration tools, and analytics |
| **Admin** | Full system access — manage users, moderate content, oversee platform operations |

### Key Features

- AI-powered writing assistance and suggestions
- Advanced text editor with real-time collaboration
- Permission-based story management
- Chapter-level rating and feedback system
- Profile analytics (follower growth, engagement)
- Reading list functionality
- Story planning tools

### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript |
| Backend | ASP.NET Core (.NET) |
| Database | PostgreSQL |
| Containerization | Docker |

---

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/kristina/chapterx
```

---

## Project Structure

```
chapterX/
├── chapterx-frontend/        # React + TypeScript frontend
├── ChapterX.API/             # ASP.NET Core Web API
├── ChapterX.Application/     # Application layer (MediatR)
├── ChapterX.Domain/          # Domain entities & interfaces
└── ChapterX.Infrastructure/  # EF Core, repositories
```

---

## Database

Before starting the applications, create and populate the database by running the `ddl.sql` and `dml.sql` scripts in an appropriate environment such as DBeaver, pgAdmin 4, or similar.

---

## Backend

```bash
cd ChapterX.API

# Copy the example config and fill in your database credentials and JWT key
cp appsettings.Development.json.example appsettings.Development.json

# Run the backend
dotnet run --project ChapterX.API
```

The API will be available at **https://localhost:7125**.

---

## Frontend

```bash
cd chapterx-frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

The app will be available at **http://localhost:5173**.
