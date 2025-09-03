# Hoosat Faucet

Miniature Hoosat faucet website based on [Hoosat Wallet](https://github.com/aspectron/hoosat-wallet) framework

### Setup Hoosatd

    $ git clone git@github.com:hoosatnet/hoosatd
    $ cd hoosatd
    $ go build
    $ cd cmd/hoosatminer
    $ go build

### Run Hoosatd Testnet

Terminal 1:

    $ cd hoosatd
    $ hoosatd --utxoindex --testnet

Terminal 2:

    $ cd hoosatd/cmd/hoosatminer
    $ hoosatminer --miningaddr=hoosattest:qpuyhaxz2chn3lsvf8g7q5uvaezpp5m7pyny4k8tyq --mine-when-not-synced --testnet

_IMPORTANT: `hoosatd 8.4 (master)` has a broken testnet genesis block, you must replace `--testnet` with `--devnet` and change the mining address to `hoosatdev:qpuyhaxz2chn3lsvf8g7q5uvaezpp5m7pygf2jzn8d`._ _When changing configuration you may need to delete Hoosat blockchain located in `~/hoosatd` folder. On Windows Hoosat blockchain is located in `AppData/Local/Hoosatd`._ _(When starting, faucet will display it's deposit address.)_

### Running

    $ git clone git@github.com:aspectron/hoosat-faucet
    $ cd hoosat-faucet
    $ npm install
    $ node hoosat-faucet

### Development Environment

To setup development environment for debugging hoosat-wallet and hoosatcore-lib modules:

Setup TypeScript:

    $ npm install -g typescript
    $ tsc -v
    # tsc should yield 4.0.5 or higher

Clone and setup repositories:

    $ git clone git@github.com:aspectron/hoosat-faucet
    $ git clone git@github.com:aspectron/hoosat-wallet
    $ git clone git@github.com:aspectron/hoosatcore-lib
    $ cd hoosatcore-lib
    $ npm link
    $ cd ..
    $ cd hoosat-wallet
    $ npm link
    $ npm link hoosatcore-lib
    $ cd ..
    $ cd hoosat-faucet
    $ npm install
    $ npm link hoosat-wallet
    $ cd ..

Terminal 1:

    $ cd hoosat-wallet
    $ tsc --watch

Terminal 2:

    $ cd hoosat-faucet
    $ node hoosat-faucet

`node hoosat-faucet` will attempt to bind to all available networks. You can use `--devnet` and `--testnet` flags to have it bind to a single network.
