class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['id', 'name', 'developer', 'image', 'district', 'badge'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const id = this.getAttribute('id') || '#';
    const name = this.getAttribute('name') || 'Project Name';
    const developer = this.getAttribute('developer') || 'Developer';
    const image = this.getAttribute('image') || '';
    const district = this.getAttribute('district') || '';
    const badge = this.getAttribute('badge') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-family-sans, system-ui);
        }
        .card {
          background: var(--color-surface, #fff);
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .image-container {
          position: relative;
          height: 200px;
          background-color: var(--color-secondary, #cbd5e1);
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--color-accent, #d4af37);
          color: var(--color-primary, #0f172a);
          padding: 4px 8px;
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 4px;
          text-transform: uppercase;
        }
        .district {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: rgba(15, 23, 42, 0.8);
          color: white;
          padding: 2px 8px;
          font-size: 0.75rem;
          border-radius: 4px;
        }
        .content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .developer {
          font-size: 0.875rem;
          color: var(--color-text-muted, #64748b);
          margin-bottom: 0.25rem;
        }
        .name {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--color-text-main, #1e293b);
          margin-bottom: 0.5rem;
        }
        .sentiment-vote {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          margin-bottom: 0.5rem;
        }
        .btn-vote {
          flex: 1;
          padding: 0.25rem;
          font-size: 0.75rem;
          background: transparent;
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 4px;
          cursor: pointer;
          color: var(--color-text-muted, #64748b);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .btn-vote:hover {
          background-color: var(--color-background, #f1f5f9);
          border-color: var(--color-secondary, #334155);
        }
        .btn-vote.active {
          background-color: #f0fdf4; /* Light green for active good */
          border-color: #166534;
          color: #166534;
          font-weight: 600;
        }
        .btn-vote.vote-bad.active {
           background-color: #fef2f2; /* Light red for active bad */
           border-color: #b91c1c;
           color: #b91c1c;
        }
        .actions {
          padding-top: 0.5rem;
        }
        .btn {
          display: block;
          width: 100%;
          padding: 0.5rem;
          background-color: var(--color-background, #f1f5f9);
          color: var(--color-secondary, #334155);
          text-align: center;
          text-decoration: none;
          border-radius: 4px;
          font-weight: 600;
          transition: background-color 0.2s;
        }
        .btn:hover {
          background-color: var(--color-border, #e2e8f0);
        }
      </style>

      <div class="card">
        <div class="image-container">
          <img src="${image}" alt="${name}">
          ${badge ? `<span class="badge">${badge}</span>` : ''}
          ${district ? `<span class="district">${district}</span>` : ''}
        </div>
        <div class="content">
          <div class="developer">${developer}</div>
          <h3 class="name">${name}</h3>
          
          <div class="sentiment-vote">
            <button class="btn-vote vote-good" onclick="this.classList.toggle('active'); this.nextElementSibling.classList.remove('active')">
              👍 Good Buy
            </button>
            <button class="btn-vote vote-bad" onclick="this.classList.toggle('active'); this.previousElementSibling.classList.remove('active')">
              👎 Not So Good
            </button>
          </div>

          <div class="actions">
            <a href="project-details.html?id=${id}" class="btn">View Details</a>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('project-card', ProjectCard);
