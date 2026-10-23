# REQUIREMENT ANALYSIS PHASE: IMOVIES DOCUMENTATION

| **Header Information** | **Details** |
| :--- | :--- |
| **Date** | October 23, 2026 |
| **Project Name** | iMovies - Movie Ticket Booking Application |
| **Maximum Marks** | 5 Marks |

---

## Document Overview
The **Requirement Analysis Phase** defines both functional and non-functional requirements for the **iMovies** movie ticket booking platform. It establishes the detailed specification of user roles, software/hardware dependencies, system constraints, and feature workflows required for building a secure MERN-stack application.

---

## 1. Functional Requirements

### 1.1 User Authentication & Authorization
* **Registration & Login**: Users must be able to create accounts and authenticate securely using email and password credentials.
* **Role-Based Access Control**:
  * **Standard User**: Can browse movie catalogs, select seats, complete ticket bookings, view booking history, and toggle application themes.
  * **Administrator**: Access restricted via an explicit hardcoded whitelist array (`ADMIN_EMAILS = ["admin@imovies.com"]`). Admins can create, edit, and delete movie listings.

---

### 1.2 Movie Catalog & Management
* **Dynamic Movie Display**: The platform must present an active list of movies complete with titles, poster images, showtimes, genres, and ticket prices.
* **Resilient Catalog Fallback**: To ensure zero display downtime, the frontend must execute a cascading fallback structure:
  $$\text{Catalog Chain} = \text{imovies\_movies} \longrightarrow \text{adminMovies} \longrightarrow \text{defaultMoviesList}$$

---

### 1.3 Booking & Seat Reservation
* **Seat Map Selection**: Users must be presented with an interactive grid layout to view available, selected, and occupied seats.
* **Email-Keyed Data Isolation**: User ticket reservations must be stored under dynamic keys matching the authenticated user's email address:
  $$\text{Storage Key} = \text{myBookings\_} + \text{userEmail}$$
* **Booking History**: Users must be able to view their confirmed bookings in a dedicated profile area without seeing tickets booked by other users.

---

### 1.4 Navigation & UI Customization
* **Floating Side Navigation Dock**: A floating UI dock (`fixed`, right: `20px`) providing 1-click access to Home, Theme Toggle (Light/Dark Mode), and Profile.
* **Reactive Cross-Tab Syncing**: Changes made to theme preferences or bookings in one tab must instantly update all open tabs using window storage event listeners:
  $$\text{window.addEventListener}("storage", \dots)$$

---

## 2. Non-Functional Requirements

| Metric / Attribute | Requirement Specification |
| :--- | :--- |
| **Performance** | Initial page load under 2.0 seconds; local UI state updates within 100ms. |
| **Security** | Strict user data isolation in local client environments; admin route protection via server-side/client-side whitelist checks. |
| **Usability & UX** | Fully responsive layout across mobile, tablet, and desktop screens; high-contrast Dark/Light mode support. |
| **Reliability** | 99.9% availability of catalog views powered by multi-level local fallback arrays. |
| **Maintainability** | Clean separation of concerns following standard MVC (Model-View-Controller) architecture patterns. |

---

## 3. System Hardware & Software Requirements

### Software Dependencies
* **Operating System**: Cross-platform (Windows 10/11, macOS, Linux).
* **Runtime Environment**: Node.js (v18.x or higher).
* **Database Management**: MongoDB Atlas / Local MongoDB instance.
* **Frontend Framework**: React.js (v18.x) with Tailwind CSS / CSS Modules.
* **Development Tools**: VS Code, Postman (API testing), Git.

### Minimum Hardware Specifications
* **Processor**: Dual-Core CPU (2.0 GHz or higher).
* **RAM**: 4 GB minimum (8 GB recommended for simultaneous server/client execution).
* **Disk Space**: 500 MB free space for project dependencies and build output.

---

## 4. Use Case Analysis & Diagram Mapping

```
                       +---------------------------+
                       |    iMovies System Portal  |
                       +---------------------------+
                                     |
         +---------------------------+---------------------------+
         |                                                       |
  [ Standard User ]                                        [ Admin User ]
         |                                                       |
         +--> Browse Movies                                      +--> Access /admin Dashboard
         +--> Select Showtimes & Seats                           +--> Add / Edit Movies
         +--> Book Tickets (myBookings_${userEmail})             +--> Delete Listings
         +--> Toggle Light/Dark Mode                             +--> View System Metrics
         +--> Sync Tabs across Windows                           +--> Enforce Whitelist Rules
```

---