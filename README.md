<div align="center">

# Portify

**The Premium Portfolio Builder.**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E.svg)](https://supabase.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Assistant-8E75B2.svg)](https://aistudio.google.com/)

</div>

---

## Overview

Portify is a fast, premium portfolio builder designed to help developers, designers, and students craft interactive online resumes in minutes. 

It features a dual-panel interface with a real-time live preview, elegant dark-mode aesthetics, and smart tools to eliminate writer's block. Built with a modern tech stack, Portify automatically persists your progress locally and seamlessly publishes a polished version of your profile to the web.

## Key Features

- **Premium Dynamic Design:** Dark mode interface with copper/amber gradients, micro-animations, and Tailwind CSS.
- **AI Assistant (Gemini API):** 
  - **AI Bio Generator:** Type a short prompt and let Gemini craft a professional 2-3 sentence bio instantly.
  - **AI Skill Suggestions:** Enter your role, and the AI will auto-populate your skills list with relevant technical and soft skills.
- **Auto-Save & Persistence:** State is automatically persisted using localStorage and Base64 image encoding, securing progress against browser refreshes.
- **One-Click Publishing:** Powered by Supabase, instantly publish your portfolio to a unique /p/:slug URL.
- **Analytics Ready:** Tracks portfolio views from your live URL in the database.
- **Responsive Templates:** Toggle between layouts designed specifically for Developers, Designers, and Students.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + JavaScript (Vite) |
| Styling | Tailwind CSS |
| Backend / Auth | Supabase |
| Database | PostgreSQL (via Supabase) |
| Deployment | Vercel |

## Database Schema

The app uses 4 tables in Supabase:
- **users** — Extended user profiles. Auto-created via a database trigger when someone signs up through Supabase Auth.
- **templates** — Stores available portfolio templates (Developer, Designer, Student). Read-only for users.
- **portfolios** — Core table. Stores portfolio content as JSONB along with the user's chosen template and unique slug. Has an is_published flag to control public visibility.
- **analytics** — Logs every visit to a public portfolio. Inserted even by unauthenticated visitors via an open RLS policy, enabling view tracking for portfolio owners.

Row Level Security (RLS) is enabled on all tables so users can only modify their own data.

## Project Structure

```text
src/
├── assets/         # Static assets and icons
├── components/     # React components
│   ├── Editor/     # Builder panel components (Profile, Skills, Projects, Auth)
│   ├── Layout/     # Core layout structures (SplitLayout)
│   └── Preview/    # Live preview rendering components
├── context/        # React Context providers (PortfolioContext)
├── hooks/          # Custom React hooks (usePortfolio)
├── pages/          # Main application views (Builder, PublicPortfolio)
├── utils/          # Utility functions (gemini.js)
├── App.jsx         # Root component and routing
├── main.jsx        # Application entry point
├── index.css       # Global styles and Tailwind configuration
└── supabase.js     # Supabase client initialization
```

## Getting Started

### Prerequisites

You will need a Supabase project and a Google AI Studio account to obtain the necessary API keys.

1. **Clone the repository:**
```bash
git clone https://github.com/snehavvv/Portify.git
cd Portify
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**
Create a .env file in the root of the project and add the following keys:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Start the Development Server:**
```bash
npm run dev
```
The app will run on http://localhost:5173/.

## Contributing
Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

---
**Author**
Sneha Varghese
GitHub: [@snehavvv](https://github.com/snehavvv)
