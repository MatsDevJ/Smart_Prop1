import { projects } from './src/data/mockData.js';
import './src/components/LeadGenModal.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    
    if (projectId) {
        renderProjectDetails(projectId);
    } else {
        document.getElementById('project-details-container').innerHTML = '<p>Project not found.</p>';
    }
});

function renderProjectDetails(id) {
    const project = projects.find(p => p.id === id);
    const container = document.getElementById('project-details-container');

    if (!project) {
        container.innerHTML = '<p>Project not found.</p>';
        return;
    }

    // Generate Nearby Projects List
    const nearbyHtml = project.nearbyProjects && project.nearbyProjects.length > 0 
        ? `<ul class="nearby-list">
             ${project.nearbyProjects.map(name => `<li>${name}</li>`).join('')}
           </ul>`
        : '<p>No nearby projects data available.</p>';

    // Parse medianPsf to a number for the default calculator value (mock logic)
    const defaultPrice = 1500000; // Default fallback

    container.innerHTML = `
        <div class="details-header">
            <div class="header-content">
                <span class="badge" style="display:inline-block; margin-bottom: 0.5rem; background: var(--color-accent); padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.875rem;">${project.badge}</span>
                <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem;">${project.name}</h1>
                <p class="developer" style="font-size: 1.25rem; color: var(--color-text-muted);">${project.developer}</p>
                <p class="district" style="margin-top: 0.5rem; font-weight: 600;">${project.district}</p>
            </div>
            <div class="header-image" style="margin-top: 1rem; border-radius: 8px; overflow: hidden; max-height: 400px;">
                <img src="${project.imageUrl}" alt="${project.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
        </div>

        <div class="details-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem;">
            
            <!-- Left Column -->
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                <!-- Key Metrics -->
                <div class="card p-6" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border);">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-primary);">Key Information</h2>
                    <div style="margin-bottom: 1rem;">
                        <strong style="display: block; color: var(--color-text-muted); font-size: 0.875rem;">Tenure</strong>
                        <span style="font-size: 1.25rem; font-weight: 600;">${project.tenure || 'N/A'}</span>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <strong style="display: block; color: var(--color-text-muted); font-size: 0.875rem;">Median Transactions</strong>
                        <span style="font-size: 1.25rem; font-weight: 600; color: var(--color-primary);">${project.medianPsf || 'N/A'} psf</span>
                    </div>
                    <div style="margin-top: 2rem;">
                        <button id="btn-floorplan" class="btn btn-accent" style="display: block; width: 100%; text-align: center;">Download Floor Plan</button>
                        <p style="text-align: center; font-size: 0.75rem; color: var(--color-text-muted); margin-top: 0.5rem;">Get access to unit layouts</p>
                    </div>
                </div>

                <!-- Mortgage Calculator (Revenue Stream #4) -->
                <div class="card p-6" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border);">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-primary);">Mortgage Estimator</h2>
                    <div style="display: grid; gap: 1rem;">
                        <div>
                            <label style="font-size: 0.875rem; color: var(--color-text-muted);">Loan Amount ($)</label>
                            <input type="number" value="${defaultPrice}" style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: 4px;">
                        </div>
                         <div>
                            <label style="font-size: 0.875rem; color: var(--color-text-muted);">Interest Rate (%)</label>
                            <input type="number" value="3.5" step="0.1" style="width: 100%; padding: 8px; border: 1px solid var(--color-border); border-radius: 4px;">
                        </div>
                    </div>
                    <div style="margin-top: 1rem; padding: 1rem; background: var(--color-background); border-radius: 4px; text-align: center;">
                        <span style="display: block; font-size: 0.875rem; color: var(--color-text-muted);">Est. Monthly Repayment</span>
                        <strong style="font-size: 1.5rem; color: var(--color-primary);">$6,735</strong>
                    </div>
                    <button id="btn-mortgage" class="btn" style="margin-top: 1rem; width: 100%; background: white; border: 1px solid var(--color-primary); color: var(--color-primary);">Get Bank Rates</button>
                </div>
            </div>

            <!-- Right Column -->
            <div style="display: flex; flex-direction: column; gap: 2rem;">
                
                <!-- Price Trend Analysis (New Feature) -->
                <div class="card p-6" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border);">
                     <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-primary);">Price Trend Analysis</h2>
                     <div style="position: relative; height: 250px; width: 100%;">
                        <canvas id="priceChart"></canvas>
                     </div>
                     <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 1rem; text-align: center;">
                        Historical PSF performance vs District Average
                     </p>
                </div>

                <!-- Analysis / Nearby -->
                <div class="card p-6" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border);">
                     <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-primary);">Competitive Landscape</h2>
                     <p style="margin-bottom: 1rem;">Comparing <strong>${project.name}</strong> with nearby developments:</p>
                     ${nearbyHtml}
                     
                     <div style="margin-top: 2rem; padding: 1rem; background: var(--color-background); border-radius: 4px;">
                        <strong style="color: var(--color-primary);">AI Assessment:</strong>
                        <p style="font-size: 0.9rem; margin-top: 0.5rem;">${project.name} offers competitive pricing relative to ${project.nearbyProjects ? project.nearbyProjects[0] : 'neighbors'}, making it a strong contender in ${project.district}.</p>
                     </div>
                </div>

                <!-- ID Ideas (Revenue Stream #5) -->
                <div class="card p-6" style="background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid var(--color-border);">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--color-primary);">Interior Inspiration</h2>
                    <div style="height: 150px; background: #e2e8f0; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #64748b; margin-bottom: 1rem;">
                        Showflat Gallery Placeholder
                    </div>
                    <p style="font-size: 0.9rem; margin-bottom: 1rem;">Visualize your future home with exclusive design themes for ${project.name}.</p>
                    <button id="btn-interior" class="btn" style="width: 100%;">View ID Proposals</button>
                </div>
            </div>

        </div>
        
        <lead-gen-modal id="lead-modal"></lead-gen-modal>
    `;

    // Setup Event Listeners
    const modal = document.getElementById('lead-modal');
    
    document.getElementById('btn-floorplan').addEventListener('click', () => {
        modal.setAttribute('type', 'Agent');
        modal.setAttribute('project-name', project.name);
        modal.setAttribute('open', '');
    });

    document.getElementById('btn-mortgage').addEventListener('click', () => {
        modal.setAttribute('type', 'Mortgage');
        modal.setAttribute('project-name', project.name);
        modal.setAttribute('open', '');
    });

    document.getElementById('btn-interior').addEventListener('click', () => {
        modal.setAttribute('type', 'Interior');
        modal.setAttribute('project-name', project.name);
        modal.setAttribute('open', '');
    });

    // Initialize Chart
    if (project.priceHistory) {
        renderChart(project);
    }
}

function renderChart(project) {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;

    const labels = project.priceHistory.map(h => h.year);
    const dataProject = project.priceHistory.map(h => h.price);
    // Mock District Average (slightly lower than project for demo)
    const dataDistrict = project.priceHistory.map(h => h.price - 150);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: `${project.name} (PSF)`,
                    data: dataProject,
                    borderColor: '#0f172a', // Slate 900 (Primary)
                    backgroundColor: 'rgba(15, 23, 42, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: `${project.district} Avg (PSF)`,
                    data: dataDistrict,
                    borderColor: '#d4af37', // Gold (Accent)
                    backgroundColor: 'rgba(212, 175, 55, 0.0)',
                    borderDash: [5, 5],
                    tension: 0.3,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'system-ui' }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': S$ ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: '#f1f5f9' },
                    ticks: {
                        callback: function(value) { return 'S$ ' + value; }
                    }
                },
                x: {
                    grid: { display: false }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}
