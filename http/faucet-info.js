import { dpc, html, css, BaseElement, FlowFormat } from "/flow/flow-ux/flow-ux.js";
import { HTN } from "./htn.js";

export class FaucetInfo extends BaseElement {
  static get properties() {
    return {
      limit: { type: Number },
      available: { type: Number },
      address: { type: String },
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        font-family: "Open Sans";
      }
      .caption {
        font-size: 22px;
      }
      .info-content {
        font-size: 16px;
      }
      .address-box {
        background: #116466;
        font-size: 0.82rem;
        font-weight: bold;
        /* border: 1px solid; */
        padding: 9px;
        border-radius: 5px;
        box-shadow: var(--flow-input-box-shadow);
        margin: 10px 0px;
        display: block;
        text-align: center;
      }
    `;
  }

  constructor() {
    super();
    this.limit = 0;
    this.available = 0;
    this.address = "";
  }

  render() {
    return html`
      <div class="info">
        <div class="caption">Welcome to Hoosat Faucet</div>
        <div class="info-content">
          <p>Hoosat Faucet sends Hoosat to anyone requesting.</p>
          <p>
            It has a defined address, where you can send Hoosat. If the faucet address has enough Hoosat, it will send
            it to an address you provide.
          </p>
          <p style="color: #FFCCCB">
            <b>Please DO NOT mine to the Faucet address directly.</b><br />
            Mine to your own wallet, then send larger amounts.
          </p>
          <p style="color: #FFCCCB">
            <b>Maximum supported balance is ~90M HTN.</b><br />
            Do not overfill it.
          </p>
          <p>Faucet can receive funds at the following address:</p>
          <p><b class="address-box">${this.address}</b></p>
          <p>
            Requests are limited to the maximum of <b>${HTN(this.limit)} HTN</b> per IP address, per <b>24 hours</b>.
          </p>
          <p>
            You currently have <b>${HTN(this.available)} HTN</b> ${this.limit == this.available
              ? "available"
              : "remaining"}.
          </p>
        </div>
      </div>
    `;
  }
}

FaucetInfo.define("faucet-info");
