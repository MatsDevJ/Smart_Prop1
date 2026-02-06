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
- **projects:** `id`, `name`, `developer`, `launchDate`, `location`, `district`, `recentTransactions`, `nearbyProjects`, `images`
- **partners:** `id`, `type` (Agent, Developer, etc.), `name`, `contactDetails`, `rating`
- **ads:** `id`, `type`, `content`, `placement`

## Current Plan: Initialization & Home Page MVP
1.  **Project Initialization:**
    -   Establish folder structure for components and modules.
    -   Define global styles (CSS variables for "Trustworthy blues", typography).
2.  **Component Development:**
    -   Create `ProjectCard` Web Component (`<project-card>`) to display project details (Image, Name, Developer, Launch Badge).
3.  **Home Page Implementation:**
    -   Scaffold the Hero Section with search placeholders.
    -   Implement "Featured Developments" section.
    -   Render a list of 5 mock Singapore new launches (e.g., "Emerald of Katong", "Chuan Park").
4.  **Firebase Config:**
    -   Set up the initial Firebase configuration placeholder in `main.js`.
