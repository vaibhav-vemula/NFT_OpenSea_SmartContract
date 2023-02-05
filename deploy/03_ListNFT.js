const { network, ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  
  const getcont = async () =>{
    nftt = await ethers.getContract("NFTToken")
    return nftt.mint(deployer, 150)
  } 
  
  add = await getcont()
  console.log(add)
  
};
module.exports.tags = ["all", "list"];