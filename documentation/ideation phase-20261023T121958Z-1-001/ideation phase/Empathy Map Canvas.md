# IDEATION PHASE: EMPATHY MAP CANVAS

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
The **Empathy Map Canvas** provides a deep understanding of the moviegoer's experience, emotional state, pain points, and desires when booking tickets online. By analyzing user behavior, this document guides the technical and design choices for the **iMovies** MERN-stack platform.

---

## Step 1: User Persona & Profile Definition

* **Primary Persona**: Alex, a 24-year-old movie enthusiast and young professional.
* **Goals**: Quickly view showtimes, select seats without system lags, manage multiple bookings, and access personal history effortlessly.
* **Environment**: Uses both desktop and mobile devices; frequently books tickets during short work breaks or on the go.

---

## Step 2: Empathy Canvas Quadrants

### 1. What the User Thinks and Feels
* **Desires**: 
  * "I want an instant, smooth booking process without unnecessary navigation steps."
  * "I need to see my active and past bookings cleanly separated."
  * "I expect dark mode support so I can comfortably browse movie listings at night."
* **Worries & Anxieties**:
  * "Will my booking get lost if I refresh the page?"
  * "Are my seat reservations saved across my session?"
  * "Is an unauthorized user going to access my personal booking list?"

---

### 2. What the User Sees
* Cluttered third-party booking sites loaded with intrusive ad popups.
* Unclear showtime information and hidden booking fees.
* Inconsistent UI color schemes across different screens (e.g., missing theme preferences).

---

### 3. What the User Hears
* Friends complaining about slow ticket reservation platforms during blockbuster releases.
* Feedback that modern web applications should support fast local syncing and seamless profile management.
* Recommendations for minimal, dark-themed UI designs for media apps.

---

### 4. What the User Says and Does
* **Actions**:
  * Frequently visits movie booking dashboards to check trending releases.
  * Toggles between Dark/Light modes based on current ambient lighting.
  * Filters and reviews confirmed ticket listings in their personal profile area.
* **Statements**:
  * "Why do I have to re-login every time I check my tickets?"
  * "I prefer a fast dock/sidebar that lets me go home or check my tickets in one click."

---

## Step 3: Pain Points & Gain Points Analysis

### Pain Points (Pains)
1. **Data Confusion**: Mixing user-specific bookings with global app data on shared local environments.
2. **Cluttered Navigation**: Complex header menus that hide key controls like Theme Toggling and Booking History.
3. **Slow State Syncing**: Changes made in one browser tab not reflecting in another without full page reloads.

---

### Gain Points (Gains)
1. **Isolated Data Security**: Email-keyed booking isolation (`myBookings_{userEmail}`) ensuring data privacy.
2. **Floating Dock Navigation**: Fixed side navigation bar offering instant 1-click access to Home, Theme Toggling, and Profile.
3. **Multi-Tab Reactive Sync**: Real-time cross-tab state syncing via `localStorage` events (`window.addEventListener("storage")`).

---

## Step 4: Actionable Insights for iMovies Architecture

| Identified Need | Technical Solution in iMovies |
| :--- | :--- |
| **Personalized Storage** | Strict isolation strategy filtering `myBookings` by `userEmail`. |
| **Seamless UI Navigation** | Floating Side Nav Bar (`right: 20px`, centered) with live controls. |
| **Role Protection** | Hardcoded Whitelist (`ADMIN_EMAILS`) protecting sensitive routes (`/admin`). |
| **Catalog Reliability** | Dynamic fallback mechanism (`imovies_movies` $\rightarrow$ `adminMovies` $\rightarrow$ `defaultMoviesList`). |

---