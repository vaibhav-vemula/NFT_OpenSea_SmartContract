const {network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const name = "NFT"
    const symbol = "SWC"

    const ourToken = await deploy("SWC", {
      from: deployer,
      args: [name, symbol],
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`ourToken deployed at ${ourToken.address}`)

    if (process.env.ETHERSCAN_API_KEY) 
    {
        await verify(ourToken.address, [name, symbol])
    }
  }
  
module.exports.tags = ["all", "SWC"]