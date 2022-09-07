require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL;
const MATIC_RPC_URL = process.env.RINKEBY_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

module.exports = {
  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 4,
      blockConfirmations: 6,
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: ETHEREUM_RPC_URL,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com" || MATIC_RPC_URL,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 5,
      chainId: 80001,
      allowUnlimitedContractSize: true,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.6",
      },
    ],
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    },
  },
  mocha: {
    timeout: 200000,
  },
};
