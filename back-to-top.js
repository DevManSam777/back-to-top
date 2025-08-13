class BackToTop extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.isVisible = false;
    this.boundScrollHandler = this.handleScroll.bind(this);
    this.boundKeyHandler = this.handleKeyPress.bind(this);
  }

  static get observedAttributes() {
    return [
      'position', 'primary-color', 'background-color', 'border-color', 'size',
      'bottom-offset', 'side-offset', 'border-radius', 'backdrop-blur',
      'box-shadow', 'show-after', 'scroll-behavior', 'animation-duration',
      'hover-lift', 'theme', 'dark-primary-color', 'dark-background-color',
      'dark-border-color', 'dark-box-shadow', 'aria-label', 'keyboard-support'
    ];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateTheme();
    this.handleScroll();
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.boundScrollHandler);
    if (this.getAttribute('keyboard-support') !== 'false') {
      document.removeEventListener('keydown', this.boundKeyHandler);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === 'theme') {
        this.updateTheme();
      } else {
        this.updateStyles();
      }
    }
  }

  render() {
    const position = this.getAttribute('position') || 'left';
    const size = this.getAttribute('size') || '3.5rem';
    const bottomOffset = this.getAttribute('bottom-offset') || '2.5rem';
    const sideOffset = this.getAttribute('side-offset') || '2rem';
    const borderRadius = this.getAttribute('border-radius') || '50%';
    const ariaLabel = this.getAttribute('aria-label') || 'Back to top';
    const animationDuration = this.getAttribute('animation-duration') || '0.3s';

    this.shadow.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: ${bottomOffset};
          ${position}: ${sideOffset};
          width: ${size};
          height: ${size};
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all ${animationDuration} cubic-bezier(0.4, 0, 0.2, 1);
        }

        :host(.show) {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        button {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: ${borderRadius};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: bold;
          transition: all ${animationDuration} cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          font-family: inherit;
          user-select: none;
        }

        button:active {
          transform: translateY(0);
        }

        button:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
      </style>
      
      <button 
        type="button" 
        aria-label="${ariaLabel}"
        ${this.getAttribute('keyboard-support') !== 'false' ? 'tabindex="0"' : ''}
      >
        ↑
      </button>
    `;

    this.button = this.shadow.querySelector('button');
    this.updateStyles();
  }

  updateStyles() {
    if (!this.button) return;

    const theme = this.getEffectiveTheme();
    const isDark = theme === 'dark';
    
    const primaryColor = isDark 
      ? (this.getAttribute('dark-primary-color') || this.getAttribute('primary-color') || '#3b82f6')
      : (this.getAttribute('primary-color') || '#2563eb');
    
    const backgroundColor = isDark
      ? (this.getAttribute('dark-background-color') || this.getAttribute('background-color') || 'rgba(59, 130, 246, 0.1)')
      : (this.getAttribute('background-color') || 'rgba(37, 99, 235, 0.1)');
    
    const borderColor = isDark
      ? (this.getAttribute('dark-border-color') || this.getAttribute('border-color') || 'rgba(59, 130, 246, 0.2)')
      : (this.getAttribute('border-color') || 'rgba(37, 99, 235, 0.2)');
    
    const boxShadow = isDark
      ? (this.getAttribute('dark-box-shadow') || this.getAttribute('box-shadow') || '0 4px 20px rgba(59, 130, 246, 0.15)')
      : (this.getAttribute('box-shadow') || '0 4px 20px rgba(37, 99, 235, 0.15)');

    const backdropBlur = this.getAttribute('backdrop-blur') || '10px';
    const hoverLift = this.getAttribute('hover-lift') || '2px';

    // Apply base styles
    this.button.style.background = backgroundColor;
    this.button.style.backdropFilter = `blur(${backdropBlur})`;
    this.button.style.border = `1px solid ${borderColor}`;
    this.button.style.color = primaryColor;
    this.button.style.boxShadow = boxShadow;

    // Calculate hover colors based on current colors
    const hoverBackgroundColor = this.lightenColor(backgroundColor, 0.05);
    const hoverBorderColor = this.lightenColor(borderColor, 0.1);
    const hoverBoxShadow = this.enhanceShadow(boxShadow);

    // Update hover styles
    const existingStyle = this.shadow.querySelector('#hover-styles');
    if (existingStyle) existingStyle.remove();

    const hoverStyle = document.createElement('style');
    hoverStyle.id = 'hover-styles';
    hoverStyle.textContent = `
      button:hover {
        background: ${hoverBackgroundColor} !important;
        border-color: ${hoverBorderColor} !important;
        box-shadow: ${hoverBoxShadow} !important;
        transform: translateY(-${hoverLift}) !important;
      }
    `;
    this.shadow.appendChild(hoverStyle);
  }

  lightenColor(color, amount) {
    // Handle rgba colors
    if (color.includes('rgba')) {
      const match = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (match) {
        const [, r, g, b, a] = match;
        const newAlpha = Math.min(parseFloat(a) + amount, 1);
        return `rgba(${r}, ${g}, ${b}, ${newAlpha})`;
      }
    }
    
    // Handle rgb colors
    if (color.includes('rgb')) {
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        const [, r, g, b] = match;
        return `rgba(${r}, ${g}, ${b}, ${Math.min(0.2, amount * 4)})`;
      }
    }

    // Fallback for other color formats
    return color;
  }

  enhanceShadow(shadow) {
    // Make shadow more prominent on hover
    if (shadow.includes('rgba')) {
      return shadow.replace(/rgba\(([^)]+)\)/, (match, values) => {
        const parts = values.split(',');
        if (parts.length === 4) {
          const alpha = parseFloat(parts[3].trim());
          parts[3] = ` ${Math.min(alpha * 1.5, 1)}`;
          return `rgba(${parts.join(',')})`;
        }
        return match;
      });
    }
    return shadow;
  }

  setupEventListeners() {
    window.addEventListener('scroll', this.boundScrollHandler, { passive: true });
    this.button.addEventListener('click', () => this.scrollToTop());
    
    if (this.getAttribute('keyboard-support') !== 'false') {
      document.addEventListener('keydown', this.boundKeyHandler);
    }

    if (this.getAttribute('theme') === 'auto' || !this.getAttribute('theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(() => this.updateTheme());
    }
  }

  handleScroll() {
    const showAfter = parseInt(this.getAttribute('show-after') || '300');
    const shouldShow = window.pageYOffset > showAfter;
    
    if (shouldShow !== this.isVisible) {
      this.isVisible = shouldShow;
      this.classList.toggle('show', shouldShow);
      
      this.dispatchEvent(new CustomEvent(shouldShow ? 'back-to-top-shown' : 'back-to-top-hidden', {
        bubbles: true,
        detail: { scrollPosition: window.pageYOffset }
      }));
    }
  }

  handleKeyPress(e) {
    if (e.key === 'Home' && (e.ctrlKey || e.metaKey || !e.ctrlKey)) {
      e.preventDefault();
      this.scrollToTop();
    }
  }

  scrollToTop() {
    const behavior = this.getAttribute('scroll-behavior') || 'smooth';
    
    window.scrollTo({
      top: 0,
      behavior: behavior
    });

    this.dispatchEvent(new CustomEvent('back-to-top-clicked', {
      bubbles: true,
      detail: { 
        previousScrollPosition: window.pageYOffset,
        timestamp: Date.now()
      }
    }));
  }

  updateTheme() {
    setTimeout(() => this.updateStyles(), 0);
  }

  getEffectiveTheme() {
    const theme = this.getAttribute('theme');
    
    if (theme === 'light' || theme === 'dark') {
      return theme;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

customElements.define('back-to-top', BackToTop);