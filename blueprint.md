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
- **ads:** `id`, `type`, `content`, `placement`

## Current Plan: Lead Gen Forms
1.  **Component Creation:**
    -   Create `<lead-gen-modal>`: A reusable modal form component.
        -   Attributes: `open` (boolean), `type` (Agent/Mortgage/Interior), `project-name`.
        -   Fields: Name, Email, Phone, + optional fields based on type.
        -   Action: Simulate form submission (alert for MVP).
2.  **Integration (Project Details Page):**
    -   **Agent Lead Gen:** Convert "Download Floor Plan" button to trigger `<lead-gen-modal type="Agent">`.
    -   **Mortgage Lead Gen:** Add "Mortgage Estimator" card with a basic input UI (Price, Interest) and a "Get Bank Rates" button triggering `<lead-gen-modal type="Mortgage">`.
    -   **Interior Design Lead Gen:** Add "Interior Inspiration" card with a "View ID Proposals" button triggering `<lead-gen-modal type="Interior">`.

## Features Implemented
- [x] Home Page (Hero, Featured List)
- [x] Project Card Component
- [x] Project Details Page (Core info, Nearby list)
- [x] Lead Gen Forms (Agent, Mortgage, Interior modals)
