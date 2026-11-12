# IDEATION PHASE: DEFINE THE PROBLEM STATEMENTS

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
This document formally identifies and articulates the core problem statements surrounding online movie ticket booking systems. By defining root causes, scope, and target user challenges, it provides the baseline requirements for the technical architecture of **iMovies**.

---

## Step 1: Background & Problem Context

Traditional online ticket booking systems often suffer from bloated user interfaces, unoptimized state synchronization, and weak client-side data isolation. In many lightweight MERN-stack implementations, persistent session storage and multi-user data isolation are overlooked, leading to corrupted state or unauthorized data visibility in local browser storage environments.

---

## Step 2: Problem Statements Definition

### Problem Statement 1: Cross-User Local Data Bleed
* **Context**: When multiple users sign in using the same client application instance or shared device.
* **Core Issue**: Standard local storage paradigms key data globally (e.g., `bookings`), causing user B to view user A's booked tickets upon logging in on the same browser.
* **Impact**: Severe breach of user data isolation and poor personal data management.

---

### Problem Statement 2: Navigation Clutter & Inaccessible Core Actions
* **Context**: Quick access to essential platform actions like Theme Toggle (Light/Dark Mode), Profile access, and Home navigation.
* **Core Issue**: Navigation menus are often buried in deep headers, making mode switching and profile checking tedious on varied screen sizes.
* **Impact**: Reduced user satisfaction and slower task completion rates.

---

### Problem Statement 3: Administrative Vulnerability in Client Routes
* **Context**: Protecting administrative management dashboards (adding/editing movies and managing schedules).
* **Core Issue**: Weak route guards that rely solely on frontend flags (e.g., `isAdmin: true`) without verified authorization checks.
* **Impact**: Unintended access to administrative endpoints and dynamic content modification.

---

### Problem Statement 4: Stale State Across Browser Tabs
* **Context**: Users opening multiple tabs of the booking portal simultaneously.
* **Core Issue**: Modifying bookings or theme toggles in Tab A does not update Tab B without a manual page refresh.
* **Impact**: Inconsistent state, leading to duplicate booking attempts or visual glitches.

---

## Step 3: Root Cause Analysis (5 Whys)

```
Problem: Users report seeing wrong ticket listings or outdated app states.
 ├── Why? Local storage data isn't mapped specifically to active logged-in user credentials.
 ├── Why? Storage utility functions rely on static keys rather than dynamic user keys.
 ├── Why? The initial frontend setup lacked multi-tenant keying logic.
 ├── Why? Reactive storage event listeners were not attached to the window instance.
 └── Root Cause: Lack of dynamic storage keying (myBookings_${userEmail}) and cross-tab window event handlers.
```

---

## Step 4: Proposed Solution Mapping (iMovies Architectural Fixes)

| Problem Statement | Solution Strategy | Technical Implementation |
| :--- | :--- | :--- |
| **1. Data Bleed** | Per-User Key Isolation | Dynamic keys using `myBookings_${userEmail}` in `localStorage`. |
| **2. Complex Navigation** | Floating Dock Navigation | Fixed Side Dock component providing instant access to Home, Theme, and Profile. |
| **3. Admin Vulnerability** | Whitelist Protection | Hardcoded `ADMIN_EMAILS` array guarding route controllers (`/admin`). |
| **4. Stale Tab State** | Reactive Storage Sync | `window.addEventListener("storage", ...)` syncing states instantly. |

---