# Smart Investor - Application Blueprint

## Overview
"Smart Investor" is a data-driven real estate platform focusing on Singapore Property New Launches for 2026. It provides price assessment tools for buyers and lead generation for industry partners (Agents, Mortgage Brokers, Interior Designers). The application aims for a clean, professional, and trustworthy user experience.

## Architecture & Tech Stack
- **Environment:** Firebase Studio (Web)
- **Core:** Modern HTML5, CSS3 (Baseline), JavaScript (ES Modules)
- **Components:** Native Web Components (Custom Elements, Shadow DOM)
- **Styling:** CSS Variables, Flexbox/Grid, Modern CSS (Oklch colors, Container Queries)
- **Backend:** Firebase (Firestore, Authentication, Hosting) - *Mocked initially*

## Data Models
- **projects:** `id`, `name`, `developer`, `launchDate`, `location`, `district`, `recentTransactions`, `nearbyProjects`, `images`, `tenure`, `medianPsf`, `floorPlanUrl`, `priceHistory`
- **partners:** `id`, `type`, `name`, `contactDetails`, `rating`
- **leads:** `id`, `partnerId`, `projectName`, `customerName`, `customerEmail`, `customerPhone`, `status`, `timestamp`
- **news:** `id`, `title`, `source`, `date`, `imageUrl`, `snippet`, `url`

## Features Implemented
- [x] Home Page (Hero, Featured List, News Section)
- [x] Project Card Component
- [x] Project Details Page (Core info, Nearby list, Price Chart)
- [x] Lead Gen Forms (Agent, Mortgage, Interior modals)
- [x] Partner Portal (Dashboard, Leads List, Mobile Nav)
- [x] News Section (URA, HDB, Developer, Agent updates)

## Current Plan: News Section
-   **Component:** `<news-card>` to display news items.
-   **Data:** Mock news from URA, HDB, etc.
-   **UI:** Grid layout on Home Page.
