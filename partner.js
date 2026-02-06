import { leads, projectTraffic } from './src/data/mockLeads.js';

window.switchTab = function(tabName) {
    // Hide all tabs
    document.getElementById('tab-dashboard').style.display = 'none';
    document.getElementById('tab-insights').style.display = 'none';
    document.getElementById('tab-leads').style.display = 'none';
    document.getElementById('tab-listings').style.display = 'none';
    document.getElementById('tab-settings').style.display = 'none';

    // Show selected tab
    document.getElementById(`tab-${tabName}`).style.display = 'block';

    // Update Nav Active State
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
        const text = item.textContent.toLowerCase();
        // Simple matching logic
        if (text.includes(tabName) || 
           (tabName === 'dashboard' && text === 'dashboard') ||
           (tabName === 'leads' && text.includes('leads')) ||
           (tabName === 'listings' && text.includes('listings')) ||
           (tabName === 'insights' && text.includes('insights')) ||
           (tabName === 'settings' && text.includes('settings'))) {
            item.classList.add('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderLeadsTable();
    renderTrafficStats();
});

function renderTrafficStats() {
    const tbody = document.getElementById('traffic-stats-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // Find max views for relative progress bar
    const maxViews = Math.max(...projectTraffic.map(p => p.views));

    projectTraffic.forEach(p => {
        const tr = document.createElement('tr');
        
        let trendColor = '#64748b'; // grey
        if (p.trendDirection === 'up') trendColor = '#166534'; // green
        if (p.trendDirection === 'down') trendColor = '#b91c1c'; // red

        const percentage = Math.round((p.views / maxViews) * 100);

        // Calculate Sentiment
        const totalVotes = (p.votes?.good || 0) + (p.votes?.bad || 0);
        let sentimentText = 'N/A';
        let sentimentColor = '#64748b';
        
        if (totalVotes > 0) {
            const goodPercent = Math.round((p.votes.good / totalVotes) * 100);
            sentimentText = `${goodPercent}% Positive`;
            if (goodPercent >= 70) sentimentColor = '#166534'; // Green
            else if (goodPercent >= 40) sentimentColor = '#d97706'; // Amber
            else sentimentColor = '#b91c1c'; // Red
        }

        tr.innerHTML = `
            <td style="padding-left: 0; font-weight: 600; color: var(--color-primary);">${p.name}</td>
            <td>${p.views.toLocaleString()}</td>
            <td>${p.uniqueVisitors.toLocaleString()}</td>
            <td style="color: ${trendColor}; font-weight: 600;">${p.trend}</td>
            <td style="vertical-align: middle;">
                <div style="width: 80px; height: 6px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                     <div style="width: ${percentage}%; height: 100%; background: var(--color-accent);"></div>
                </div>
            </td>
            <td style="text-align: right; color: ${sentimentColor}; font-weight: 600;">${sentimentText}</td>
        `;
        tbody.appendChild(tr);
    });
}

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
