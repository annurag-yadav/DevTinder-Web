# TalentLink

**Connect through skills. Build your network.**

TalentLink is a professional networking platform for developers, students, and tech professionals. Discover people by skills, domains, and experience — send connection requests, grow your network, and chat in real time.

**Live site:** [https://talentlink.in](https://talentlink.in)

> This repository is the **frontend** for TalentLink. The local folder may still be named `DevTinder-Web` from an earlier project name; the product and domain are **TalentLink**.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Environment & API Configuration](#environment--api-configuration)
- [Routes](#routes)
- [State Management](#state-management)
- [Premium Memberships](#premium-memberships)
- [Deployment Notes](#deployment-notes)
- [Contributing](#contributing)
- [Author & Links](#author--links)
- [License](#license)

---

## Overview

TalentLink helps developers and students find meaningful professional connections based on what actually matters in tech — **skills**, **domains**, **experience**, and **shared interests**.

Instead of a generic social feed, TalentLink uses a discovery flow similar to modern matching apps:

1. Browse curated profiles in your **Feed**
2. Mark profiles as **Interested** or **Ignore**
3. When both sides are interested, you become **Connections**
4. Start **real-time chat** with your connections
5. **Search** for people by name, skill, domain, role, or organization

The app includes profile onboarding, protected routes, premium tiers powered by Razorpay, and legal pages (Terms of Service & Privacy Policy).

---

## Features

### Authentication & Account

- User **signup** and **login** with email and password
- **Forgot password** flow with email reset link
- **Reset password** page for setting a new password
- Session-based auth using **HTTP-only cookies** (`withCredentials: true`)
- **Protected routes** — authenticated pages redirect to `/login` when not signed in

### Profile & Onboarding

- Multi-step **profile setup** after signup (domains, skills, experience, status, role, organization)
- **Edit profile** with live preview card
- **Public profile** pages viewable at `/profile/:userId`
- Profile completion gate — incomplete profiles are redirected to `/profile/setup`

### Discovery & Networking

- **Feed** — browse recommended profiles one at a time with match percentage
- **Interested / Ignore** actions on feed cards
- **Connection requests** — review incoming requests (accept or reject)
- **Connections** — list of accepted connections with quick access to chat
- **Search** — debounced navbar search + full paginated search results page

### Real-Time Chat

- One-to-one messaging between connected users
- Powered by **Socket.io** for live message delivery
- Chat history loaded from REST API on open

### Premium (Razorpay)

- **Silver** — ₹199 / 3 months
- **Gold** — ₹399 / 6 months (recommended)
- Secure checkout via Razorpay
- Premium badge and enhanced networking limits

### Legal & UI

- Terms of Service (`/terms`)
- Privacy Policy (`/privacy`)
- Responsive layout with **Tailwind CSS** and **DaisyUI**
- Dark-themed, modern UI with navbar, footer, and loading states

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Routing | [React Router DOM 7](https://reactrouter.com/) |
| State | [Redux Toolkit](https://redux-toolkit.js.org/) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) |
| Real-Time | [Socket.io Client](https://socket.io/) |
| Payments | [Razorpay Checkout](https://razorpay.com/) |
| Compiler | React Compiler (Babel plugin) |
| Linting | ESLint |

---

## Project Structure

```
DevTinder-Web/                 # Local folder name (product: TalentLink)
├── public/
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Body.jsx             # App shell: navbar, outlet, footer, auth bootstrap
│   │   ├── NavBar.jsx           # Navigation, search, logout
│   │   ├── Footer.jsx
│   │   ├── Login.jsx            # Login, signup, forgot password
│   │   ├── ResetPassword.jsx
│   │   ├── Feed.jsx             # Discovery feed
│   │   ├── UserCard.jsx         # Profile card with Interested/Ignore
│   │   ├── Profile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── ProfileSetup.jsx     # Onboarding wizard
│   │   ├── PublicProfile.jsx
│   │   ├── Connections.jsx
│   │   ├── Requests.jsx
│   │   ├── Chat.jsx             # Real-time messaging
│   │   ├── SearchResults.jsx
│   │   ├── Premium.jsx          # Razorpay membership
│   │   ├── ProtectedRoute.jsx
│   │   ├── Terms.jsx
│   │   └── Privacy.jsx
│   ├── utils/
│   │   ├── appStore.js          # Redux store configuration
│   │   ├── userSlice.js
│   │   ├── feedSlice.js
│   │   ├── conectionSlice.js
│   │   ├── requestSlice.js
│   │   ├── constants.js         # API base URL
│   │   └── socket.js            # Socket.io connection helper
│   ├── App.jsx                  # Route definitions
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + DaisyUI imports
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A running **TalentLink backend API** (required for auth, feed, chat, payments, etc.)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/annurag-yadav/DevTinder-Web.git
   cd DevTinder-Web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open the URL shown in your terminal (typically `http://localhost:5173`).

### Backend Requirement

This frontend expects a backend server with REST endpoints and Socket.io support.

| Environment | API Base URL | Socket Path |
|-------------|--------------|-------------|
| Local dev | `http://localhost:3000` | Direct to backend URL |
| Production | `/api` (proxied) | `/api/socket.io` |

Make sure your backend is running on **port 3000** during local development, or update `src/utils/constants.js` if your setup differs.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot reload |
| `npm run build` | Create production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment & API Configuration

API routing is handled in `src/utils/constants.js`:

```javascript
const API_BASE_URL = location.hostname === "localhost"
  ? "http://localhost:3000"
  : "/api";

export const BaseURL = API_BASE_URL;
```

Socket connections follow the same pattern in `src/utils/socket.js`:

- **Local:** connects to `http://localhost:3000`
- **Production:** connects to `/` with path `/api/socket.io`

No `.env` file is required for basic local development, but you may add one later if you introduce Vite environment variables (e.g. `VITE_API_URL`).

### Key API Endpoints Used (Frontend)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/signup` | Register new user |
| POST | `/login` | Authenticate user |
| POST | `/logout` | End session |
| POST | `/forgot-password` | Send reset email |
| GET | `/profile/view` | Get logged-in user |
| PATCH | `/profile/edit` | Update profile |
| POST | `/profile/setup` | Complete onboarding |
| GET | `/profile/:userId` | Public profile |
| GET | `/feed` | Discovery feed |
| POST | `/request/send/:status/:userId` | Send interested/ignored |
| GET | `/user/requests/received` | Incoming requests |
| POST | `/request/review/:status/:id` | Accept/reject request |
| GET | `/user/connections` | List connections |
| GET | `/search?q=...` | Search users |
| GET | `/chat/:targetUserId` | Chat history |
| GET | `/premium/verify` | Check premium status |
| POST | `/payment/create` | Create Razorpay order |

---

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Protected | Discovery feed |
| `/login` | Public | Login, signup, forgot password |
| `/profile` | Protected | Edit your profile |
| `/profile/setup` | Protected | Onboarding after signup |
| `/profile/:userId` | Protected | View another user's profile |
| `/search?q=...` | Protected | Paginated search results |
| `/connections` | Protected | Your connections |
| `/requests` | Protected | Incoming connection requests |
| `/premium` | Protected | Premium membership plans |
| `/chat/:targetUserId` | Protected | Real-time chat |
| `/reset-password` | Public | Password reset form |
| `/terms` | Public | Terms of Service |
| `/privacy` | Public | Privacy Policy |

---

## State Management

Redux Toolkit slices in `src/utils/`:

| Slice | State | Purpose |
|-------|-------|---------|
| `userSlice` | Current logged-in user | Auth & profile data |
| `feedSlice` | Feed users | Discovery queue |
| `conectionSlice` | Connections list | Accepted connections |
| `requestSlice` | Pending requests | Incoming requests |

The store is provided at the app root in `App.jsx` via `<Provider store={appstore}>`.

---

## Premium Memberships

TalentLink offers two paid tiers via **Razorpay**:

### Silver — ₹199 / 3 months

- Chat with other members
- 10 connection requests per day
- Premium profile badge
- Premium networking features

### Gold — ₹399 / 6 months *(Recommended)*

- Everything in Silver
- Unlimited connection requests
- Higher visibility in networking
- 6 months of premium access

Razorpay checkout is loaded from `index.html`. Payment verification runs through `/premium/verify` after a successful transaction.

---

## Deployment Notes

1. **Build the frontend**

   ```bash
   npm run build
   ```

2. **Serve the `dist/` folder** behind your web server (Nginx, Vercel, Netlify, etc.).

3. **Reverse-proxy `/api`** to your backend so production requests hit the same origin:

   - REST API → backend server
   - WebSocket → backend at `/api/socket.io`

4. Point your domain **talentlink.in** to the deployed frontend.

5. Ensure backend CORS and cookie settings allow credentials from your production domain.

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes with a clear message
4. Push to your fork and open a Pull Request

Please keep changes focused and match the existing code style (functional React components, Redux for shared state, Tailwind/DaisyUI for styling).

---

## Author & Links

**Anurag Yadav**

- Website: [talentlink.in](https://talentlink.in)
- GitHub: [@annurag-yadav](https://github.com/annurag-yadav)
- LinkedIn: [Anurag Yadav](https://www.linkedin.com/in/-anuragyadav)

---

## License

This project is a student-built portfolio / academic project. All rights reserved unless otherwise specified by the author.

For questions, reach out via the contact link on [talentlink.in](https://talentlink.in) or open an issue on GitHub.

---

<p align="center">
  Built with ❤️ for the developer community — <strong>TalentLink</strong>
</p>
