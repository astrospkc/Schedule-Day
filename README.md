### Backend repo
[Backend](https://github.com/astrospkc/Schedule-Day-backend-)

### live url
[Live](https://schedule-day-ruddy.vercel.app/)

## Scheduler system
A full-stack recurring scheduler application that allows creating, updating, deleting, and managing weekly recurring time slots with support for per-date exceptions. Each day can have up to two slots, and modifications apply only to that date, preserving the original recurring pattern.

Frontend is built with React + TypeScript + Tailwind, and the backend uses Node.js + TypeScript + PostgreSQL (Knex). The app is fully functional and can be deployed live.

## Features:
- Create recurring weekly slots (e.g., every Monday 09:00–11:00)
- Up to 2 slots per day
- Per-date exceptions for editing or deleting specific occurrences without affecting others
- View current week’s schedule with slots
- Infinite scroll to load future weeks
- Fully typed backend & frontend
- Email notifications
- Take notes (to be added feature)
- whatsapp integration(to be added feature)


## Tech stack:
### Frontend
- React (TypeScript)
- Tailwind CSS
- React Query / SWR
- Day.js or date-fns
- React-calender

### Backend
- Node.js (TypeScript)
- Express.js 
- Knex.js (Query Builder)
- PostgreSQL
- Resend(to email)

