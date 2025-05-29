# 🚀 DOiT-POSTS-APP (Next.js 14 + Redux Toolkit)

This project is a test assignment involving the development of a blog platform with CRUD operations, built with Next.js 14 (App Router), Redux Toolkit, Material UI, and TypeScript. Features include dark/light mode, search functionality, post comments, and a sleek UI.

![Tech Stack](https://img.shields.io/badge/Next.js-14-blue)
![Redux](https://img.shields.io/badge/Redux_Toolkit-8.1.0-purple)
![MUI](https://img.shields.io/badge/Material_UI-5.14.0-blue)

## ✨ Key Features

✅ **Full CRUD Operations**  
✅ **Comment System**  
✅ **Advanced UI**  
- Material UI v5 components  
- Dark/light theme toggle  
- Responsive design for all devices  
✅ **State Management**  
Redux Toolkit for predictable state container  
✅ **Modern Routing**  
Next.js App Router for optimized navigation  

## 🛠 Tech Stack

| Category           | Technologies                          |
|--------------------|---------------------------------------|
| Framework          | Next.js 14 (App Router)               |
| State Management   | Redux Toolkit                         |
| UI Library         | Material UI v5                        |
| API Client         | Axios                                 |
| Type System        | TypeScript                            |

## 🚀 Quick Start

Clone the repository:

- git clone https://github.com/your-username/doit-posts-app.git
- cd doit-posts-app
---
## 📁 Project Structure
```text
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
```
---
## 🔮 Future Improvements

✅ API Optimization

Transition to RTK Query for:
- Automatic caching
- Optimized requests
- Less boilerplate code

✅ UX Improvements

- Add spinners for all asynchronous actions
- Form validation
- Enhance error handling (e.g., when saving/deleting posts)

✅ Unit Testing

- Use Jest + React Testing Library
- Test Redux slices and UI components (e.g., PostCard, Header)

✅ Responsiveness / Mobile Support

- Ensure compatibility with different screen sizes
- Optimize UI for mobile devices