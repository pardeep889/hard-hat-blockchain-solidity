require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config();
require("./tasks/block-number")
require("hardhat-gas-reporter")


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    rinkeby:{
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  solidity: "0.8.9",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    token: "MATIC"
  }
};
