import './src/components/ProjectCard.js';
import { projects } from './src/data/mockData.js';

// Initialize Firebase (Placeholder)
const firebaseConfig = {
  // Config would go here
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
};

// Initialize app logic when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProjects();
});

function renderFeaturedProjects() {
  const container = document.getElementById('featured-projects-list');
  if (!container) return;

  container.innerHTML = ''; // Clear existing content

  projects.forEach(project => {
    const card = document.createElement('project-card');
    card.setAttribute('id', project.id);
    card.setAttribute('name', project.name);
    card.setAttribute('developer', project.developer);
    card.setAttribute('image', project.imageUrl);
    card.setAttribute('district', project.district);
    card.setAttribute('badge', project.badge);
    
    container.appendChild(card);
  });
}

console.log('Smart Investor App Initialized');
