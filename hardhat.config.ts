import "@nomicfoundation/hardhat-toolbox";
// require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()




module.exports = {
  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    kovan: {
      url: "",
      accounts: {
          mnemonic: "MNEMONIC",
      },
      saveDeployments: true,
      chainId: 42,
    },
  },
  mumbai: {
    chainId: "",
    url: process.env.URL,
    accounts: [process.env.ACCOUNT]
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.6",
      },
      {
        version: "0.4.24",
      },
    ],
  },
  // mocha: {
  //   timeout: 200000, // 200 seconds max for running tests
  // },
}
