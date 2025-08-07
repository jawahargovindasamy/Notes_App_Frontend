# Notes Application Frontend

A modern, responsive web application for managing personal notes. This is the frontend part of the Notes Application, built with React and Tailwind CSS. It allows users to register, log in, create, edit, pin, archive, and delete notes in an intuitive interface.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration and authentication (JWT-based)
- Create, edit, pin, archive, and delete notes
- Restore or permanently delete notes from Trash
- Tag notes for easy organization
- Responsive design for mobile and desktop
- User-friendly interface with smooth transitions
- Secure handling of user data
- Search and filter notes by title, description, or tags

---

## Tech Stack

- **Frontend Framework:** React
- **Routing:** React Router DOM
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Styling:** Tailwind CSS
- **HTTP Requests:** Axios
- **Icons:** React Icons
- **Build Tool:** Vite

---

## Folder Structure

```
Notes_App_Frontend/
├── public/                # Static files
├── src/
│   ├── Components/        # Reusable React components (e.g., NoteCard)
│   ├── Pages/             # Page components (Home, Login, Register, NoteForm)
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles (Tailwind)
│   └── main.jsx           # Entry point
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Notes_App_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory if you need to override API URLs.
   - Example:
     ```
     VITE_API_URL=https://notes-app-backend-tnt0.onrender.com
     ```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` by default (Vite).

---

## Usage

- **Register:** Create a new account on the Register page.
- **Login:** Sign in with your credentials.
- **Create Note:** Use the "Create Note" button to add a new note.
- **Edit Note:** Click "Edit" on any note to update its details.
- **Pin/Archive:** Pin or archive notes for better organization.
- **Delete/Restore:** Move notes to Trash or restore them.
- **Permanent Delete:** Remove notes permanently from Trash.
- **Search:** Use the search bar to filter notes by title, description, or tags.
- **Logout:** Click "Logout" in the header to end your session.

---

## API Endpoints

The frontend interacts with a backend API. Example endpoints:

- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — Login and receive JWT token
- `GET /api/notes/get` — Fetch all notes (requires Authorization header)
- `POST /api/notes/create` — Create a new note
- `PUT /api/notes/edit/:id` — Edit an existing note
- `PUT /api/notes/toggle/:id` — Toggle pinned, archived, or deleted status
- `DELETE /api/notes/delete/:id` — Permanently delete a note

**Note:** The backend URL is set in the code as `https://notes-app-backend-tnt0.onrender.com` for notes, and `http://localhost:5000` for user authentication (update as needed).

---

## Available Scripts

- `npm run dev` — Runs the app in development mode (Vite)
- `npm run build` — Builds the app for production
- `npm run preview` — Serves the production build locally
- `npm run lint` — Runs ESLint for code quality

---

## Environment Variables

If your app interacts with a backend API, you may need to set environment variables. Create a `.env` file in the root directory and add variables such as:

```
VITE_API_URL=https://notes-app-backend-tnt0.onrender.com
```

---

## Troubleshooting

- **API Errors:** Ensure the backend server is running and accessible.
- **CORS Issues:** Make sure the backend allows requests from your frontend origin.
- **Login/Registration Issues:** Check the backend API URL and endpoints.
- **Styling Issues:** Confirm Tailwind CSS is installed and configured in `vite.config.js` and `index.css`.
- **Build Errors:** Run `npm run lint` to check for syntax or ESLint errors.

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

This project is licensed under the MIT License.