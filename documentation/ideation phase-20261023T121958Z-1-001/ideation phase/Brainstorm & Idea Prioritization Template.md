# IDEATION PHASE: BRAINSTORM & IDEA PRIORITIZATION TEMPLATE

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
This document captures the creative brainstorming session for the **iMovies** platform, categorizing feature concepts and prioritizing them based on technical feasibility, impact, and alignability with the 6 core SkillWallet architecture topics.

---

## Step 1: Brainstorming & Idea Generation

During the initial team session, several potential features were proposed to make iMovies a fast, efficient, and user-centric ticket booking application.

### Generated Feature Ideas
1. **Per-User Local Keying**: Storing active ticket bookings keyed specifically by user email (`myBookings_{userEmail}`).
2. **Floating Side Dock Bar**: A floating navigation dock positioned on the right side of the screen for one-click navigation (Home, Light/Dark Theme Toggle, Profile).
3. **Hardcoded Admin Whitelist**: Protecting admin management interfaces (`/admin`) using an explicit whitelist array (`ADMIN_EMAILS`).
4. **Dynamic Movie Fallback Chain**: Implementing a cascading catalog loader (`imovies_movies` $\rightarrow$ `adminMovies` $\rightarrow$ `defaultMoviesList`) to ensure movie listings are always available.
5. **Real-time Cross-Tab Syncing**: Using `window.addEventListener("storage")` listeners so state changes reflect across all open tabs instantly.
6. **Live Theater Seat Mapping (3D)**: Interactive 3D seating view using WebGL/Three.js.
7. **Social Ticket Sharing**: Allowing users to invite friends via social media integrations directly from their booking confirmation.

---

## Step 2: Idea Classification & SkillWallet Topic Mapping

The generated ideas are mapped directly to the **6 Core Topics** from the SkillWallet Project Architecture requirements:

| Idea / Feature | SkillWallet Architecture Topic |
| :--- | :--- |
| **Dynamic Fallback Chain & Floating Dock UI** | **1. Technical Architecture** |
| **Schema Mapping for Users, Movies, Bookings** | **2. ER-Diagram** |
| **Email-Keyed Storage & Real-Time Sync** | **3. Features** |
| **User vs. Whitelisted Admin Privileges** | **4. Roles and Responsibilities** |
| **Navigation & Booking Selection Paths** | **5. User Flow** |
| **Frontend Controllers & Express Backend Separation** | **6. MVC Pattern** |

---

## Step 3: Prioritization Matrix (Value vs. Complexity)

To ensure smooth delivery within the development phase, features are evaluated on **Impact (Value)** versus **Implementation Complexity**.

```
      HIGH IMPACT
         │
  [Quad 1: Quick Wins]       │   [Quad 2: Major Projects]
  • Per-User Storage Sync    │   • Dynamic Movie Fallback Chain
  • Floating Side Dock Nav   │   • Real-Time Cross-Tab Syncing
  • Hardcoded Admin Guard    │
 ────────────────────────────┼─────────────────────────────
  [Quad 3: Fill-ins]         │   [Quad 4: Hard / Low Priority]
  • Custom Theme Toggles     │   • Social Media Sharing
                             │   • 3D Interactive Seating
                             │
                             └────────────────────────────── HIGH COMPLEXITY
```

---

## Step 4: Final Feature Selection & Execution Plan

### Selected High-Priority Core Features (Phase 1 Execution)

1. **User-Isolated Storage Structure**:
   * **Implementation**: Store bookings using `myBookings_${userEmail}` to ensure complete multi-tenant privacy on shared client instances.
2. **Floating Navigation Dock**:
   * **Implementation**: React UI component pinned (`right: 20px`, vertically centered) providing direct access to Home, Dark/Light Mode, and Profile.
3. **Admin Route Protection**:
   * **Implementation**: Enforce `/admin` access check against `ADMIN_EMAILS = ["admin@imovies.com"]`.
4. **Catalog Resiliency**:
   * **Implementation**: Fallback logic ensuring default movies render seamlessly if local/remote database endpoints are loading or unpopulated.
5. **Cross-Tab Reactive Sync**:
   * **Implementation**: Window storage event listener updating React state when local storage undergoes mutation in secondary tabs.

---