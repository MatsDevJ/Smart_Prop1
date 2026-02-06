# Smart Investor - Application Blueprint

## Overview
"Smart Investor" is a data-driven real estate platform focusing on Singapore Property New Launches for 2026. It provides price assessment tools for buyers and lead generation for industry partners (Agents, Mortgage Brokers, Interior Designers). The application aims for a clean, professional, and trustworthy user experience.

## Architecture & Tech Stack
- **Environment:** Firebase Studio (Web)
- **Core:** Modern HTML5, CSS3 (Baseline), JavaScript (ES Modules)
- **Components:** Native Web Components (Custom Elements, Shadow DOM)
- **Styling:** CSS Variables, Flexbox/Grid, Modern CSS (Oklch colors, Container Queries)
- **Backend:** Firebase (Firestore, Authentication, Hosting) - *Mocked initially*

## Data Models (Firestore Schema Design)
- **projects:** `id`, `name`, `developer`, `launchDate`, `location`, `district`, `recentTransactions`, `nearbyProjects`, `images`, `tenure`, `medianPsf`, `floorPlanUrl`
- **partners:** `id`, `type` (Agent, Developer, etc.), `name`, `contactDetails`, `rating`
- **leads:** `id`, `partnerId`, `projectName`, `customerName`, `customerEmail`, `customerPhone`, `status`, `timestamp`
- **ads:** `id`, `type`, `content`, `placement`

## Current Plan: Partner Portal
1.  **New Page (`partner-portal.html`):**
    -   A dashboard for partners to view their leads.
    -   **Login Mockup:** Simple button to "Login as Agent" (bypassing real auth for MVP).
2.  **Dashboard UI (`partner.js`):**
    -   **Stats Overview:** Cards showing "Total Leads", "Conversion Rate", "Recent Enquiries".
    -   **Leads Table:** List of leads generated from the "Project Details" page (mocked data initially).
    -   **Profile Section:** Simple form to update contact details.
3.  **Data Update:**
    -   Create `mockLeads.js` to simulate incoming enquiries from the lead gen forms.

## Features Implemented
- [x] Home Page (Hero, Featured List)
- [x] Project Card Component
- [x] Project Details Page (Core info, Nearby list)
- [x] Lead Gen Forms (Agent, Mortgage, Interior modals)
- [ ] Partner Portal (Dashboard, Leads List)