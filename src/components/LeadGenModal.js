class LeadGenModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['open', 'type', 'project-name'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.setupEventListeners();
    }
  }

  setupEventListeners() {
    const closeBtn = this.shadowRoot.querySelector('.close');
    const overlay = this.shadowRoot.querySelector('.overlay');
    const form = this.shadowRoot.querySelector('form');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would send data to Firebase
        alert(`Thank you! Your request for ${this.getAttribute('project-name')} has been sent to our ${this.getAttribute('type')} partner.`);
        this.close();
      });
    }
  }

  close() {
    this.removeAttribute('open');
  }

  render() {
    const isOpen = this.hasAttribute('open');
    const type = this.getAttribute('type') || 'Agent';
    const projectName = this.getAttribute('project-name') || 'Project';

    let title = 'Contact Us';
    let message = 'Fill out the form below.';

    switch (type) {
      case 'Agent':
        title = 'Get Floorplans & Brochure';
        message = `Receive the official floorplans and latest pricing for ${projectName}.`;
        break;
      case 'Mortgage':
        title = 'Get Mortgage Rates';
        message = `Connect with a broker to get the best rates for ${projectName}.`;
        break;
      case 'Interior':
        title = 'Get ID Proposals';
        message = `Get exclusive showflat design ideas for ${projectName}.`;
        break;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: ${isOpen ? 'block' : 'none'};
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          font-family: var(--font-family-sans, system-ui);
        }
        .overlay {
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          backdrop-filter: blur(2px);
        }
        .modal {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #64748b;
        }
        h2 {
          margin-top: 0;
          color: var(--color-primary, #0f172a);
        }
        p {
          color: #64748b;
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #334155;
          font-size: 0.875rem;
        }
        input, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          font-size: 1rem;
          box-sizing: border-box; /* Fix padding issue */
        }
        button[type="submit"] {
          width: 100%;
          padding: 0.75rem;
          background-color: var(--color-accent, #d4af37);
          color: var(--color-primary, #0f172a);
          border: none;
          border-radius: 4px;
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          margin-top: 1rem;
        }
        button[type="submit"]:hover {
          opacity: 0.9;
        }
      </style>
      <div class="overlay">
        <div class="modal">
          <button class="close">&times;</button>
          <h2>${title}</h2>
          <p>${message}</p>
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" required placeholder="John Doe">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" required placeholder="john@example.com">
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" required placeholder="+65 9123 4567">
            </div>
            ${type === 'Mortgage' ? `
            <div class="form-group">
              <label for="loan-amount">Target Loan Amount</label>
              <input type="number" id="loan-amount" placeholder="e.g. 1500000">
            </div>
            ` : ''}
            <button type="submit">Submit Request</button>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('lead-gen-modal', LeadGenModal);
