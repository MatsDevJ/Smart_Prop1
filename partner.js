import { leads } from './src/data/mockLeads.js';

window.switchTab = function(tabName) {
    // Hide all tabs
    document.getElementById('tab-dashboard').style.display = 'none';
    document.getElementById('tab-insights').style.display = 'none';

    // Show selected tab
    document.getElementById(`tab-${tabName}`).style.display = 'block';

    // Update Nav Active State (Simple text match for MVP)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.textContent.toLowerCase().includes(tabName) || (tabName === 'dashboard' && item.textContent === 'Dashboard')) {
            item.classList.add('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderLeadsTable();
});

function renderStats() {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;

    document.getElementById('total-leads').textContent = totalLeads;
    document.getElementById('new-leads').textContent = newLeads;
}

function renderLeadsTable() {
    const tbody = document.getElementById('leads-table-body');
    tbody.innerHTML = '';

    leads.forEach(lead => {
        const tr = document.createElement('tr');
        
        let statusClass = 'status-new';
        if (lead.status === 'Contacted') statusClass = 'status-contacted';
        if (lead.status === 'Closed') statusClass = 'status-closed';

        tr.innerHTML = `
            <td>${lead.date}</td>
            <td>${lead.projectName}</td>
            <td>
                <div style="font-weight: 500;">${lead.customerName}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${lead.customerPhone}</div>
            </td>
            <td>${lead.type}</td>
            <td><span class="status-badge ${statusClass}">${lead.status}</span></td>
            <td>
                <button class="btn" style="padding: 4px 8px; font-size: 0.75rem; background: var(--color-background); color: var(--color-primary);">View</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
