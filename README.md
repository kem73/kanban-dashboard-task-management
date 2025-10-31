# 🧭 Kanban Task Management Dashboard

A modern **drag-and-drop Kanban dashboard** designed for efficient task tracking, agile workflow management, and seamless team collaboration.  
Built with **React**, **TypeScript**, **Vite**, and powered by a mock REST API using **json-server**.

---

## 🏗️ Project Summary

The **Kanban Task Management Dashboard** provides a **visual** and **interactive** way to organize tasks through different workflow stages.  
It’s optimized for **performance**, **responsiveness**, and a **clean user experience** — ideal for teams and individuals managing projects.

---

## 🔍 Table of Contents

- [🚀 Key Features](#-key-features)
- [🧩 Tech Stack](#-tech-stack)
- [🏛️ Architecture Overview](#%EF%B8%8F-architecture-overview)
- [⚙️ Installation & Setup](#%EF%B8%8F-installation--setup)
- [📜 Available Scripts](#-available-scripts)
- [📂 Project Structure](#-project-structure)
- [💾 Data Persistence & API](#-data-persistence--api)
- [🎨 UI & UX](#-ui--ux)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Key Features

| Feature | Description |
|----------|-------------|
| 🗂️ **Interactive Kanban Board** | Organize tasks by dragging and dropping between columns. |
| ✏️ **Task Management** | Create, update, delete, and move tasks effortlessly. |
| 🔎 **Advanced Search** | Filter tasks by title or description with optimized debounce input. |
| 💾 **Persistent Storage** | Changes automatically saved using a mock REST API (json-server). |
| 📱 **Fully Responsive Design** | Optimized for desktop, tablet, and mobile users. |
| ⚡ **High Performance** | Built with Vite for fast development and production builds. |
| 🧠 **Type-Safe Development** | Written entirely in TypeScript for reliability and scalability. |


## 🧰 Tech Stack

| **Category** | **Technology** |
|---------------|----------------|
| 🖥️ **Frontend** | React 18, TypeScript, Vite |
| 🎨 **Styling** | Bootstrap 5, CSS Modules |
| ⚛️ **State Management** | React Hooks & Context API |
| 🧩 **Mock Backend** | json-server |
| 🛠️ **Build & Tooling** | Node.js, NPM |

---



## 🏗️ Architecture Overview

The app follows a **modular and scalable architecture** for maintainability and clarity:

```bash
src/
├── components/   # Reusable UI components (cards, modals, inputs, etc.)
├── config/     # API interaction layer
├── assets/        # Icons, Images, Styles
├── utils/        # Utility functions and constants
└── types/       # Static types




## ⚙️ Installation & Setup

Follow these steps to get the project running locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/kem73/kanban-dashboard-task-management.git
cd kanban-dashboard-task-management

### 3️⃣ Install Packages
```bash
npm i

### 3️⃣ Run the Mock API
```bash
npx json-server --watch db.json --port 4000

### 4️⃣ Start the Development Server
```bash
npm run dev



✅ **Your application will be live at:**  
[http://localhost:5173](http://localhost:5173)

🌐 **API will run at:**  
[http://localhost:4000/tasks](http://localhost:4000/tasks)



## 🧩 Available Scripts

| Command | Description |
|----------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Serves the production build locally |
| `npx json-server` | Launches the mock REST API |

---

## 🔄 Data Persistence & API

The backend simulation is powered by **json-server**, serving data from **db.json**.



### 🗂️ Each Task Includes

```json
{
  "id": 1,
  "title": "Kanban Dashboard",
  "description": "Dashboard page.",
  "status": "done"
}



### 🌐 API Endpoint

**Available Methods:**  
`GET` / `POST` / `PUT` / `DELETE` → [http://localhost:4000/tasks](http://localhost:4000/tasks)

---


## 🎨 UI & UX

- Built using **Bootstrap 5** for a clean and accessible design  
- **Responsive grid layout** ensuring full usability on any device  
- **Drag-and-drop** powered by React DnD (or native HTML5 API)  
- Smooth transitions and **interactive feedback** for intuitive task movement  

---


## 🔮 Future Enhancements

- 🌐 **User authentication & role-based access**  
- 🧑‍🤝‍🧑 **Multi-user collaboration**  
- 🔔 **Real-time notifications**  
- 📊 **Task analytics & progress tracking**  
- ☁️ **Cloud data sync** with real API integration  

## 🤝 Contributing

Contributions are always welcome! 🙌  
If you'd like to propose changes or improvements, please follow these steps:

1. **Fork** the repository  
2. **Create a feature branch**  
   ```bash
   git checkout -b feature/your-feature
3. **Commit your changes**  
   ```bash
   git commit -m "Add new feature"
4. **Push to the branch**  
   ```bash
   git push origin feature/your-feature
5. **Open a Pull Request** on GitHub 🚀


## 📜 License

This project is licensed under the **MIT License**.  
You are free to **use**, **modify**, and **distribute** it — with proper attribution.  

> © 2025 Kanban Task Management Dashboard
