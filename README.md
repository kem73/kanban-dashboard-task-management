🧭 Kanban Task Management Dashboard

A modern, drag-and-drop Kanban dashboard designed for efficient task tracking, agile workflow management, and seamless team collaboration.
Built with React, TypeScript, Vite, and powered by a mock REST API using json-server.

🏗️ Project Summary

The Kanban Task Management Dashboard provides a visual and interactive way to organize tasks through different workflow stages.
It’s optimized for performance, responsiveness, and a clean user experience — ideal for teams and individuals managing projects.

🔍 Table of Contents

Key Features

Tech Stack

Architecture Overview

Installation & Setup

Available Scripts

Project Structure

Data Persistence & API

UI & UX

Future Enhancements

Contributing

License

🚀 Key Features

🗂️ Interactive Kanban Board – Organize tasks by dragging and dropping between columns.

✏️ Task Management – Create, update, delete, and move tasks effortlessly.

🔎 Advanced Search – Filter tasks by title or description with optimized debounce input.

💾 Persistent Storage – Changes automatically saved using a mock REST API (json-server).

📱 Fully Responsive Design – Optimized for desktop, tablet, and mobile users.

⚡ High Performance – Built with Vite for fast development and production builds.

🧠 Type-Safe Development – Written entirely in TypeScript for reliability and scalability.

🧰 Tech Stack
Category	Technology
Frontend	React 18, TypeScript, Vite
Styling	Bootstrap 5, CSS Modules
State Management	React Hooks & Context API
Mock Backend	json-server
Build & Tooling	Node.js, NPM
🏗️ Architecture Overview

The app follows a modular and scalable architecture:

src/
 ├── components/        # Reusable UI components (cards, modals, inputs, etc.)
 ├── context/           # Global state management using React Context
 ├── hooks/             # Custom hooks for data fetching and logic abstraction
 ├── services/          # API interaction layer
 ├── pages/             # Main Kanban board and layout screens
 ├── utils/             # Utility functions and constants
 └── styles/            # Global and modular CSS styles

⚙️ Installation & Setup

Follow these steps to get the project running locally:

1. Clone the Repository
git clone https://github.com/kem73/kanban-dashboard.git
cd kanban-dashboard-

2. Install Dependencies
npm install

3. Run the Mock API
npx json-server --watch db.json --port 4000

4. Start the Development Server
npm run dev


Your application will be live at http://localhost:5173

API will run at http://localhost:4000/tasks

🧩 Available Scripts
Command	Description
npm run dev	Starts the development server
npm run build	Builds the app for production
npm run preview	Serves the production build locally
npx json-server	Launches the mock REST API
🔄 Data Persistence & API

The backend simulation is powered by json-server, serving data from db.json.

Each task includes:

{
  "id": 1,
  "title": "Design Homepage",
  "description": "Create responsive UI for the main landing page.",
  "status": "In Progress"
}


API Endpoint:

GET/POST/PUT/DELETE → http://localhost:4000/tasks

🎨 UI & UX

Built using Bootstrap 5 for a clean and accessible design.

Responsive grid layout ensuring full usability on any device.

Drag-and-drop powered by React DnD (or HTML5 native API).

Smooth transitions and feedback for intuitive task movement.

🔮 Future Enhancements

🌐 User authentication & role-based access

🧑‍🤝‍🧑 Multi-user collaboration

🔔 Real-time notifications

📊 Task analytics & progress tracking

☁️ Cloud data sync with real API integration

🤝 Contributing

Contributions are welcome!
If you’d like to propose changes or improvements:

Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit your changes (git commit -m 'Add new feature')

Push to the branch (git push origin feature/your-feature)

Open a pull request

📜 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it with attribution.