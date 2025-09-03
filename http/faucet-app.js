import "/style/style.js";
import { dpc, camelCase, html, UID, FlowApp, FlowFormat } from "/flow/flow-ux/flow-ux.js";
export * from "./faucet-form.js";
export * from "./faucet-info.js";
export * from "./faucet-balance.js";
export * from "./faucet-transactions.js";
export * from "./hoosat-transaction.js";

class HoosatFaucetApp extends FlowApp {
  static get properties() {
    return {
      network: { type: String },
      networks: { type: Array },
      addresses: { type: Object },
      available: { type: Object },
      limits: { type: Object },
    };
  }
  constructor() {
    super();

    this.networks = ["hoosat-mainnet", "hoosat-testnet", "hoosat-devnet", "hoosat-simnet"];
    this.network = "hoosat-mainnet";
    this.addresses = {};
    this.available = {};
    this.limits = {};
    this.opt = {};

    this.aliases = {
      "hoosat-mainnet": "MAINNET",
      "hoosat-testnet": "TESTNET",
      "hoosat-devnet": "DEVNET",
      "hoosat-simnet": "SIMNET",
    };

    this.initLog();
    dpc(async () => this.init());
    this.registerListener("popstate", (e) => {
      let { menu = "home", args = [] } = e.state || {};
      console.log(`popstate: ${document.location}, state: ${JSON.stringify(e.state)}`);
      this.setMenu(menu, args, true);
    });
  }

  async init() {
    await this.initSocketRPC({
      timeout: 90,
      args: {
        transports: ["websocket"],
      },
    });
    await this.initUI();
    dpc(() => this.setLoading(false));
  }

  async initUI() {
    this.bodyEl = document.body;
  }

  onlineCallback() {
    const { rpc } = flow.app;
    this.networkUpdates = rpc.subscribe(`networks`);
    (async () => {
      for await (const msg of this.networkUpdates) {
        const { networks } = msg.data;
        this.networks = networks;
        if (!this.networks.includes(this.network)) this.network = this.networks[0];
        console.log("available networks:", networks);
        this.requestUpdate();
      }
    })().then();

    this.addressUpdates = rpc.subscribe(`addresses`);
    (async () => {
      for await (const msg of this.addressUpdates) {
        const { addresses } = msg.data;
        this.addresses = addresses;
        this.requestUpdate();
        // this.networks = networks;
        // console.log("available networks:",networks);
      }
    })().then();

    this.limitUpdates = rpc.subscribe(`limit`);
    (async () => {
      for await (const msg of this.limitUpdates) {
        const { network, limit, available } = msg.data;
        console.log("limits", msg.data);
        this.limits[network] = limit;
        this.available[network] = available;
        if (this.network == network) this.requestUpdate();
      }
    })().then();
  }

  offlineCallback() {
    this.networkUpdates.stop();
    this.addressUpdates.stop();
    this.limitUpdates.stop();
  }

  render() {
    let network = this.network;
    let address = this.addresses?.[this.network] || "";
    let limit = this.limits?.[this.network] || "";
    let available = this.available?.[this.network] || "";

    return html`
      <flow-app-layout no-drawer no-header>
        <div slot="main" class="main-area flex sbar" col>
          <div for="home" row class="content">
            <div class="divider"></div>
            <div col class="balance-wrapper">
              <faucet-balance network="${network}"></faucet-balance>
              <faucet-transactions network="${network}"></faucet-transactions>
            </div>
            <div class="divider"></div>
            <div col class="form-wrapper">
              <faucet-info limit="${limit}" available="${available}" address="${address}"></faucet-info>
              <faucet-form
                network="${network}"
                .networks="${this.networks}"
                address="${address}"
                @network-change="${this.onNetworkChange}"
              >
              </faucet-form>
            </div>
            <div class="divider"></div>
          </div>
        </div>
      </flow-app-layout>
    `;
  }

  onNetworkChange(e) {
    console.log("on-network-change", e.detail);
    this.network = e.detail.network;
  }
}

HoosatFaucetApp.define("hoosat-faucet-app");
