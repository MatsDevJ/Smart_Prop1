class NewsCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'source', 'date', 'image', 'snippet', 'url'];
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
    const title = this.getAttribute('title') || 'News Title';
    const source = this.getAttribute('source') || 'Source';
    const date = this.getAttribute('date') || '';
    const image = this.getAttribute('image') || '';
    const snippet = this.getAttribute('snippet') || '';
    const url = this.getAttribute('url') || '#';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-family-sans, system-ui);
        }
        .card {
          background: white;
          border: 1px solid var(--color-border, #e2e8f0);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 100%;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: var(--color-accent, #d4af37);
        }
        .image-container {
          height: 140px; /* Slightly smaller than original */
          background-color: var(--color-secondary, #cbd5e1);
          overflow: hidden;
        }
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .card:hover .image-container img {
          transform: scale(1.05);
        }
        .content {
          padding: 1rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .meta {
          font-size: 0.75rem;
          color: var(--color-text-muted, #64748b);
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .source-badge {
          background-color: var(--color-background, #f1f5f9);
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
          color: var(--color-primary, #0f172a);
        }
        .title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text-main, #1e293b);
          margin-bottom: 0.5rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .snippet {
          font-size: 0.8rem;
          color: var(--color-text-muted, #64748b);
          line-height: 1.5;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style>

      <a href="${url}" target="_blank" class="card">
        <div class="image-container">
          <img src="${image}" alt="${title}">
        </div>
        <div class="content">
          <div class="meta">
            <span class="source-badge">${source}</span>
            <span>${date}</span>
          </div>
          <h3 class="title">${title}</h3>
          <p class="snippet">${snippet}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('news-card', NewsCard);
