# PROJECT DESIGN PHASE: PROBLEM - SOLUTION FIT TEMPLATE

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
The **Problem - Solution Fit Template** bridges the gap between identified user pain points and the technical solutions provided by the **iMovies** platform. It verifies that every core feature directly solves a real user problem, validating the design before deep implementation.

---

## 1. Problem Identification & Context

### Target Audience / Customer Segment
* **Primary Users**: Moviegoers, tech-savvy youths, and families seeking quick online ticket reservations.
* **Secondary Users**: Platform administrators managing cinema catalogs, showtimes, and movie availability.

### Existing User Pain Points
1. **Data Leakage & Privacy Invasions**: Unsecured local caching causing ticket booking details to spill across different user sessions on shared devices.
2. **Navigation Friction**: Cluttered user interfaces that bury essential functions like dark/light mode switches, personal profile access, and home navigation.
3. **Admin UI Security Risks**: Weak frontend route checks exposing admin panels (`/admin`) to unauthorized normal users.
4. **Unreliable Catalog Loads**: Empty or broken movie listings due to database connection delays or unpopulated dynamic data.

---

## 2. Problem - Solution Alignment Matrix

| Identified User Problem | Root Cause | Proposed iMovies Solution | Fit & Validation Status |
| :--- | :--- | :--- | :--- |
| **Data Leakage on Shared Devices** | Global storage keys used across logins (`localStorage.setItem('bookings', ...)`). | Dynamic email-isolated storage keys (`myBookings_${userEmail}`). | **Validated**: Each user sees only their own bookings even on shared browsers. |
| **UI Clutter & Slow Navigation** | Menus hidden inside multi-layer top header dropdowns. | Fixed Floating Side Dock Bar (`fixed`, right: `20px`) for 1-click access. | **Validated**: Instant toggle between Home, Light/Dark theme, and Profile. |
| **Unauthorized Admin Access** | Insecure frontend-only state flags (e.g., `user.isAdmin = true`). | Strict Whitelist Array Guard (`ADMIN_EMAILS = ["admin@imovies.com"]`). | **Validated**: Non-whitelisted users are blocked from viewing or mutating `/admin`. |
| **Empty Catalog Screens** | App dependent solely on active DB response without local fallback. | Cascading Fallback Chain (`imovies_movies` $\rightarrow$ `adminMovies` $\rightarrow$ `defaultMoviesList`). | **Validated**: UI guarantees visible movies regardless of DB state. |

---

## 3. Core Value Proposition

* **To Moviegoers**: Fast, clean, dark-mode friendly ticket booking experience that respects privacy and syncs seamlessly across browser tabs.
* **To System Administrators**: Secure, whitelist-protected content management dashboard to seamlessly update and control movie listings.
* **To Developers**: Scalable, modular MERN architecture with robust frontend fallback handling and clean state isolation.

---