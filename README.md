<div align="center">

# ✨ Portify

**The AI-Powered, Premium Portfolio Builder.**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_&_Auth-3ECF8E.svg)](https://supabase.io/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Assistant-8E75B2.svg)](https://aistudio.google.com/)

</div>

---

## 🚀 Overview

**Portify** is a lightning-fast, premium portfolio builder designed to help developers, designers, and students craft stunning, interactive online resumes in minutes. 

It features a dual-panel interface with a real-time live preview, elegant dark-mode aesthetics, and a suite of smart tools to eliminate writer's block. Built with a modern tech stack, Portify automatically persists your progress locally and seamlessly publishes a polished version of your profile to the web.

## ✨ Key Features

- **🎨 Premium Dynamic Design:** Gorgeous dark mode interface with copper/amber gradients, micro-animations, and Tailwind CSS v4.
- **🤖 AI Assistant (Gemini API):** 
  - **AI Bio Generator:** Type a short prompt (e.g., "MERN dev with 3 years exp") and let Gemini craft a professional 2-3 sentence bio instantly.
  - **AI Skill Suggestions:** Enter your role, and the AI will auto-populate your skills list with the most relevant technical and soft skills.
- **💾 Auto-Save & Persistence:** State is automatically persisted using `localStorage` and Base64 image encoding, meaning your progress is completely safe against browser refreshes.
- **🚀 One-Click Publishing:** Powered by Supabase, instantly publish your portfolio to a unique `/p/:slug` URL.
- **📊 Analytics Ready:** Tracks portfolio views from your live URL in the database.
- **📱 Responsive Templates:** Instantly toggle between tailored layouts designed specifically for Developers, Designers, and Students.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS v4, Lucide React (Icons)
- **Backend / Database:** Supabase (PostgreSQL, Authentication)
- **AI Integration:** `@google/generative-ai` (Gemini 1.5 Flash)

## 💻 Getting Started

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
Create a `.env` file in the root of the project and add the following keys:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. **Start the Development Server:**
```bash
npm run dev
```
The app will instantly run on `http://localhost:5173/`.

## 📦 Database Schema

Portify expects a Supabase project with the following basic structure:
- `portfolios`: Stores the published portfolio data (profile, skills, projects, contact, slug, template_id).
- `templates`: Stores available templates (`dev`, `design`, `student`).
- `analytics`: Tracks page views mapping to `portfolio_id`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

---
*Built with ❤️ for rapid portfolio generation.*
