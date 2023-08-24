// import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox")
// require("@nomiclabs/hardhat-waffle")
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
    chainId: "80001",
    url: process.env.URL,
    accounts: [process.env.MUMBAI_PRIVATE_KEY]
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
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: "ABCDE12345ABCDE12345ABCDE123456789",
  },
}
