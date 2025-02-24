/**
 * Copyright 2025 shreyswaroop
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.counter = 16;
    this.title = "";
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  
updated(changedProperties) {
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('counter')) {
    // do your testing of the value and make it rain by calling makeItRain
    if (this.counter ===21){
      this.makeItRain();
    }
  }
}

makeItRain() {
  // this is called a dynamic import. It means it won't import the code for confetti until this method is called
  // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
  // will only run AFTER the code is imported and available to us
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      // This is a minor timing 'hack'. We know the code library above will import prior to this running
      // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
      // this "hack" ensures the element has had time to process in the DOM so that when we set popped
      // it's listening for changes so it can react
      setTimeout(() => {
        // forcibly set the poppped attribute on something with id confetti
        // while I've said in general NOT to do this, the confetti container element will reset this
        // after the animation runs so it's a simple way to generate the effect over and over again
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

  increase() {
    if (this.counter < 25) {
      this.counter++;
    }
  }

  decrease() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      counter: {type: Number, reflect: true},
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-xxxl));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-s));
      }

      :host([counter="18"]) .counter {
        color: var(--ddd-theme-default-opportunityGreen);
      }
      :host([counter="21"]) .counter {
        color: var(--ddd-theme-default-skyBlue);
      }
      :host([counter="0"]), :host([counter="25"]) .counter {
        color: var(--ddd-theme-default-keystoneYellow);
      }

      .buttons {
        display: flex;
        justify-content: center;
        gap: var(--ddd-spacing-4);
      }

      button {
        font-size: var(--ddd-font-size-m);
        padding: var(--ddd-spacing-4) var(--ddd-spacing-8);
        border: var(--ddd-border-md);
        border-radius: var(--ddd-radius-md);
        background-color: var(--ddd-theme-default-slateLight);
        color: var(--ddd-theme-default-nittanyNavy);
      }

      button:hover {
        background-color: var(--ddd-theme-default-skyLight-hover);
        transform: scale(1.05);
      }

      button:focus {
        outline: var(--ddd-border-focus);
        box-shadow: var(--ddd-boxShadow-focus);
      }

      button:disabled {
        background-color: var(--ddd-theme-default-alertImmediate);
        cursor: not-allowed;
        transform: none;
      }
      .counter {
        font-size: var(--counter-app-counter-font-size, var(--ddd-font-size-xxxl));
        text-align: center;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class = "wrapper">
      <confetti-container id="confetti"></confetti-container>
      <div class = "counter">${this.counter}</div>
      <div class ="buttons">
        <button @click="${this.decrease}" ?disabled="${this.counter === 0}">-1</button>
        <button @click="${this.increase}" ?disabled="${this.counter === 25}">+1</button>
      </div>
    </div>
    `;
  }
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);