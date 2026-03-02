# Attendance App - Frontend

Frontend application for Attendance System built with **React + Vite**.

## 🏗 Overview

This app connects to the Attendance API (NestJS microservices backend) and provides:

- Authentication (Login/Register)
- User management
- Attendance tracking
- Real-time notifications (SSE integration)
- Responsive UI

---

## ⚙️ Tech Stack

- React (Vite)
- React Router
- TanStack Query
- Axios
- Zod
- React Hook Form
- Tailwind CSS
- shadcn/ui

---

## 📦 Main Libraries

- **React Router** → Routing & navigation
- **TanStack Query** → Server state management & caching
- **Axios** → HTTP client
- **Zod** → Schema validation
- **React Hook Form** → Form handling
- **Tailwind CSS** → Utility-first styling
- **shadcn/ui** → Reusable UI components

---

## 🔔 Real-Time Notification

This app consumes Server-Sent Events (SSE) from the backend notification service to receive real-time updates.

---

## 🚀 Installation

```bash
cp .env.example .env
pnpm install
pnpm dev
```

### Description

- `cp .env.example .env` → Generate .env file from .env.example
- `pnpm install` → Install dependencies
- `pnpm dev` → Start development server

App will run on:

```
http://localhost:5173
```
