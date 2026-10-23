# PROJECT DESIGN PHASE: PROPOSED SOLUTION

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
This document details the **Proposed Solution** for the **iMovies** movie ticket booking platform. It outlines the modular system structure, user interaction flows, data management strategies, and core technical solutions designed to address the challenges identified during the Ideation and Requirement Analysis phases.

---

## 1. Solution Architecture Overview

The proposed solution for **iMovies** is a responsive, highly resilient full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 

```
                                  +-----------------------+
                                  |   React.js Frontend   |
                                  | (Single Page App UI)  |
                                  +-----------+-----------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
        +-------------------------+                       +-------------------------+
        | Floating Dock Nav & UI  |                       | Email-Keyed Storage     |
        | - Theme Toggle          |                       | myBookings_${userEmail} |
        | - Route Controls        |                       | - Reactive Window Sync  |
        +-------------------------+                       +-------------------------+
                     |                                                 |
                     +------------------------+------------------------+
                                              |
                                              v
                                  +-----------------------+
                                  | Node/Express REST API |
                                  | - Whitelist Security  |
                                  +-----------+-----------+
                                              |
                                              v
                                  +-----------------------+
                                  |    MongoDB Database   |
                                  | (Users/Movies/Tickets)|
                                  +-----------------------+
```

---

## 2. Core Functional Modules

### 2.1 Multi-Tenant Local Data Isolation Engine
To prevent cross-user data exposure on shared client devices, the platform implements dynamic per-user keying in browser local storage:
$$\text{Storage Key} = \text{myBookings\_} + \text{userEmail}$$

This ensures that when User A logs out and User B logs in, User B can never view or modify User A's ticket bookings.

---

### 2.2 Responsive Floating Navigation Dock
Instead of deeply nested header drop-downs, iMovies uses a fixed, floating vertical dock on the right side of the screen (`right: 20px`):
* **Home Button**: Fast redirection to the main movie discovery catalog.
* **Theme Switcher**: Instant switching between Light and Dark mode UI presets.
* **User Profile & Tickets**: One-click access to active and past movie passes.

---

### 2.3 Whitelisted Administrative Control Panel
Administrative routes (`/admin`) are protected by validating user session email addresses against a strict whitelist:
$$\text{ADMIN\_EMAILS} = \left[ \text{"admin@imovies.com"} \right]$$

Non-whitelisted users attempting to navigate to administrative pages are automatically redirected to the home catalog.

---

### 2.4 Dynamic Catalog Fallback Strategy
To guarantee 100% catalog uptime, the application executes a cascading data lookup order:
1. `imovies_movies` (Primary DB / Custom storage)
2. `adminMovies` (Admin override storage)
3. `defaultMoviesList` (Hardcoded fallback array)

---

## 3. Technology Stack Alignment

| Module | Technology Selected | Technical Rationale |
| :--- | :--- | :--- |
| **User Interface** | React.js (Hooks + Context API) | Fast dynamic state updates and modular component rendering. |
| **Styling & Theme** | Tailwind CSS / CSS Variables | Easy toggle management between Dark and Light mode themes. |
| **Backend API** | Node.js & Express.js | Asynchronous, non-blocking I/O handling high concurrency. |
| **Database** | MongoDB & Mongoose ODM | Flexible document schema for nesting showtimes, seats, and movie details. |

---