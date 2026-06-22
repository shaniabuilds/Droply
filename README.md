# Droply

## Project Overview

Droply is a modern cloud-based file management platform that allows users to securely upload, organize, manage, and access their files through an intuitive web interface.

The application provides folder organization, file uploads, starring, trash management, search functionality, and secure user authentication, creating a streamlined file storage experience similar to modern cloud storage platforms.

This project demonstrates:

* Full-stack web development
* Authentication and authorization
* Cloud file storage integration
* Database-driven applications
* Modern SaaS UI/UX design
* Scalable file management architecture

---

# Live Deployment

## Public Working URL

https://droply-iota.vercel.app/

---

# Why Droply

Managing files across devices and folders can quickly become disorganized.

Droply solves this problem by providing:

* Centralized file management
* Folder-based organization
* Secure authentication
* Quick file search and access
* Starred file collections
* Trash and recovery management

The goal is to create a clean and modern cloud storage experience.

---

# Core Features

## Secure Authentication

Users can create accounts and securely access their personal files.

Authentication is handled using Clerk.

---

## File Upload System

Users can upload files directly from their device.

Files are securely stored using ImageKit cloud storage.

---

## Folder Management

The platform supports:

* Create folders
* Organize files
* Nested folder structures
* Folder navigation

---

## Search Functionality

Users can quickly locate files using the built-in search system.

---

## Starred Files

Important files can be marked as starred for quick access.

---

## Trash Management

Deleted files are moved to trash and can be managed separately from active files.

---

## Responsive Dashboard

The application provides a modern dashboard optimized for:

* Desktop
* Tablet
* Mobile devices

---

# Application Workflow

The system performs the following operations:

1. User Authentication
2. File Upload
3. Cloud Storage Processing
4. Database Record Creation
5. Folder Organization
6. File Search & Retrieval
7. Starred & Trash Management

---

# System Architecture

```text
User
  ↓
Next.js Frontend
  ↓
Clerk Authentication
  ↓
API Routes
  ↓
ImageKit Storage
  ↓
Neon PostgreSQL
  ↓
Drizzle ORM
  ↓
User Dashboard
```

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* DaisyUI

---

## Backend

- Next.js API Routes
- Server Actions

---

## Authentication

* Clerk

---

## Database

* Neon PostgreSQL
* Drizzle ORM

---

## File Storage

* ImageKit

---

## Deployment

* Vercel

---

# Project Structure

```text
app/
│
├── dashboard/
├── sign-in/
├── sign-up/
├── api/
│
components/
│
lib/
│
├── db
│
public/
│
└── README.md
```

---

# Key Engineering Concepts Used

* Authentication & Authorization
* Cloud File Storage
* Server Actions & API Routes
* Database Modeling
* ORM Integration
* User Data Isolation
* Responsive Design
* Full-Stack Architecture

---

# Challenges Solved

* Secure user authentication
* Cloud file uploads
* Folder hierarchy management
* User-specific file access
* Search implementation
* File organization workflows
* Responsive dashboard design

---


# Author

## Shania

---

# Support

If you found this project useful, consider giving it a star on GitHub.
