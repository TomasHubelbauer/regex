export default class Editor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const font = this.style.font || 'normal 16px monospace';

    this.style.position = 'relative';
    this.styles = document.createElement('style');
    this.styles.textContent = `
textarea { color: transparent; }
textarea:placeholder-shown { color: initial; }
`;

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style.width = '100%';
    this.div.style.height = '100%';
    this.div.style.font = font;
    this.div.style.whiteSpace = 'pre';
    this.div.style.overflow = 'auto';

    this.textArea = document.createElement('textarea');
    this.textArea.style.position = 'absolute';
    this.textArea.style.width = '100%';
    this.textArea.style.height = '100%';
    this.textArea.style.border = 'none';
    this.textArea.style.padding = 0;
    this.textArea.style.background = 'none';
    this.textArea.style.caretColor = 'black';
    this.textArea.style.font = font;
    this.textArea.style.resize = 'none';

    this.textArea.addEventListener('input', this.handleTextAreaInput);
    this.textArea.addEventListener('scroll', this.handleTextAreaScroll);

    this.shadowRoot.append(this.styles, this.div, this.textArea);
  }

  handleTextAreaInput = () => {
    if (this._highlighter) {
      const fragment = document.createDocumentFragment();
      const tokens = this._highlighter(this.textArea.value);
      for (const token of tokens) {
        const span = document.createElement('span');
        span.textContent = token.value;
        span.style.color = token.color;
        span.style.fontWeight = token.fontWeight;
        fragment.append(span);
      }

      this.div.innerHTML = '';
      this.div.append(fragment);
    }
    else {
      // TODO: Do not have the div in the first place if no highlighter
      this.div.textContent = this.textArea.value;
    }

    this.dispatchEvent(new Event('change', {}));
  };

  // TODO: Display scroll event with first highlight token visible for scroll sync
  handleTextAreaScroll = () => {
    this.div.scrollTop = this.textArea.scrollTop;
  };

  get value() {
    return this.textArea.value;
  }

  set value(value) {
    this.textArea.value = value;
    this.handleTextAreaInput();
  }

  get placeholder() {
    return this.textArea.placeholder;
  }

  set placeholder(value) {
    this.textArea.placeholder = value;
  }

  set highlighter(value) {
    this._highlighter = value;
  }

  static get observedAttributes() {
    return ['placeholder'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'placeholder': {
        this.placeholder = newValue;
        break;
      }
    }
  }
}