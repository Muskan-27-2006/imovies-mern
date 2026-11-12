# PROJECT PLANNING PHASE: IMOVIES DOCUMENTATION

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
The **Project Planning Phase** establishes the execution roadmap, technology stack, resource allocation, and timeline for building the **iMovies** movie ticket booking platform. It breaks down the full development cycle across the MERN stack into actionable milestones.

---

## 1. Project Objectives & Scope

### Primary Objectives
1. **Seamless Ticket Booking**: Build a fast, reliable single-page application (SPA) for browsing movies, selecting showtimes, and reserving seats.
2. **Robust Multi-Tenant Local Data Isolation**: Prevent cross-user data exposure on shared devices through email-keyed local storage structures (`myBookings_${userEmail}`).
3. **Role-Based Access Control**: Secure the `/admin` route via whitelisted administrative credentials (`ADMIN_EMAILS`).
4. **Real-Time Cross-Tab State Sync**: Ensure live synchronization of theme toggles and booking updates across open browser tabs using window storage event listeners.

### In-Scope Features
* User Authentication & Profile Management.
* Dynamic Movie Catalog Rendering with resilient fallback structures.
* Seat Selection & Booking Management.
* Administrative Dashboard for managing movie listings.
* Floating Navigation Dock with instant controls (Home, Theme Toggle, Profile).

### Out-of-Scope Features (Phase 1)
* Real-time payment gateway integration (simulated booking confirmations used).
* 3D seat map visualization using WebGL.

---

## 2. Technology Stack & Tools Selection

| Layer | Technology / Tool | Justification |
| :--- | :--- | :--- |
| **Frontend** | React.js, Tailwind CSS / Custom CSS | Fast component-based UI rendering, responsive layouts, dynamic theme switching. |
| **Backend** | Node.js, Express.js | Non-blocking, asynchronous event-driven architecture suitable for API routes. |
| **Database** | MongoDB (Mongoose ODM) | NoSQL flexible schema model ideal for nesting user profiles, movies, and bookings. |
| **State & Storage** | React Context API, Browser `localStorage` | Client-side persistent storage with reactive cross-tab window event syncing. |
| **Version Control** | Git & GitHub | Modular code management, branching, and team collaboration. |

---

## 3. Work Breakdown Structure (WBS)

```
iMovies Project Execution
├── 1. Project Setup & Configuration
│   ├── 1.1 Directory Initialization (Client/Server)
│   ├── 1.2 Package Installation & Dependencies
│   └── 1.3 Environment Configuration (.env setup)
├── 2. Database Development
│   ├── 2.1 MongoDB Atlas Connection Setup
│   ├── 2.2 User Schema & Model Definition
│   ├── 2.3 Movie Schema & Model Definition
│   └── 2.4 Booking Schema & Model Definition
├── 3. Backend API Development
│   ├── 3.1 Auth Controller (Login, Register, Whitelist Guard)
│   ├── 3.2 Movie Routes (GET Catalog, POST Add Movie)
│   └── 3.3 Booking Controller (POST Reserve, GET User History)
├── 4. Frontend Application Development
│   ├── 4.1 Floating Side Navigation Dock Component
│   ├── 4.2 Dynamic Movie Catalog & Fallback Loader
│   ├── 4.3 Interactive Seat Booking UI
│   └── 4.4 Email-Keyed Storage Engine (`myBookings_${userEmail}`)
└── 5. Integration, Testing & Execution
    ├── 5.1 Route Protection & Admin Whitelist Verification
    ├── 5.2 Cross-Tab Sync Testing
    └── 5.3 Final Production Build Execution
```

---

## 4. Project Schedule & Milestone Timeline

| Phase / Milestone | Tasks | Estimated Timeline |
| :--- | :--- | :--- |
| **Milestone 1: Setup & DB** | Project directory creation, Express server setup, MongoDB connection string configuration. | Days 1 - 2 |
| **Milestone 2: Backend APIs** | Mongoose schema creation, REST API endpoints for user auth, movie CRUD, and booking routes. | Days 3 - 5 |
| **Milestone 3: Frontend Structure** | React setup, Floating Side Dock implementation, state context for Theme and User auth. | Days 6 - 8 |
| **Milestone 4: Storage & Sync** | Implementation of per-user storage isolation (`myBookings_${userEmail}`) and cross-tab storage listeners. | Days 9 - 11 |
| **Milestone 5: Testing & Execution** | End-to-end integration testing, administrative access checks, demo screenshots and execution docs. | Days 12 - 14 |

---

## 5. Risk Assessment & Mitigation Plan

| Identified Risk | Impact Level | Risk Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **Cross-User Data Leakage** | High | Medium | Implement email-scoped storage keys (`myBookings_${userEmail}`) rather than global keying. |
| **Database Connection Failure** | High | Low | Create a dynamic frontend fallback chain (`imovies_movies` $\rightarrow$ `adminMovies` $\rightarrow$ `defaultMoviesList`). |
| **Unauthorized Admin Route Access** | High | Medium | Enforce strict whitelist verification checks (`ADMIN_EMAILS`) inside route guards. |
| **Inconsistent Tab State** | Medium | High | Attach `window.addEventListener("storage", ...)` listeners to auto-refresh UI state on change. |

---