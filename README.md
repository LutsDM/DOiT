# 🚀 DOiT-POSTS-APP (Next.js 14 + Redux Toolkit)
This project is a test assignment involving the development of a blog platform with CRUD operations,
built with Next.js 14 (App Router), Redux Toolkit, Material UI, and TypeScript.
Features include dark/light mode, search functionality, post comments, and a sleek U

[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?logo=next.js)](https://nextjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![MUI](https://img.shields.io/badge/MUI-5.14.0-007FFF?logo=mui)](https://mui.com/)

## ✨ Key Features

- **Full CRUD Operations** for blog posts
- **Comment System** with live fetching
- **Advanced UI** with Material UI components
- **State Management** with Redux Toolkit
- **Responsive Design** for all devices
- **Modern Routing** with Next.js App Router

## 🛠 Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Framework       | Next.js 14 (App Router)               |
| State Management| Redux Toolkit + RTK Query (planned)   |
| UI Library      | Material UI v5                        |
| API Client      | Axios                                 |
| Type System     | TypeScript                            |

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/your-username/doit-posts-app.git
cd doit-posts-app

Install dependencies:
npm install

Start development server:
npm run dev

Open http://localhost:3000 in your browser.

Project Structure
doit-posts-app/
├── app/
│ ├── posts/ # Post management routes
│ │ ├── [id]/ # Dynamic post detail route
│ │ │ └── page.tsx # Single post view
│ │ ├── create/ # Post creation
│ │ │ └── page.tsx # Create post form
│ │ └── page.tsx # Posts listing
│ ├── layout.tsx # Root layout
│ └── template.tsx # Shared template
│ └── types.ts # Type definitions
│ └── page.tsx # Hero
│
├── components/ # UI Components
│ ├── CommentsDialog.tsx # Comments modal
│ ├── PostActions.tsx # Post CRUD actions
│ ├── PostLayout.tsx # Post detail layout
│ ├── SideDrawer.tsx # Navigation drawer
│ └── TopAppBar.tsx # Application header
│
├── context/
│ └── ThemeContext.tsx # Theme management
│
├── features/
│ └── postsState/ # Redux logic
│ ├── postsActions.ts # API actions
│ └── postSlice.ts # Redux slice
│
├── store/ # Redux configuration
│ ├── hooks.ts # Typed hooks
│ ├── Providers.tsx # ReduxProvider
│ ├── store.ts # Store setup

│
├── public/ # Static assets
├── src/ # Source directory


🚀  Development Recommendations

API Optimization

Transition to RTK Query for:
Automatic caching
Optimized requests
Less boilerplate code

UX Improvements

Add spinners for all asynchronous actions
Form validation
Enhance error handling (e.g., when saving/deleting posts)

Unit Testing

Use Jest + React Testing Library
Test Redux slices and UI components (e.g., PostCard, Header)

Responsiveness / Mobile Support

Ensure compatibility with different screen sizes
Optimize UI for mobile devices