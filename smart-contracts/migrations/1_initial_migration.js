//const Migrations = artifacts.require("Migrations");
const SsafyToken = artifacts.require("SsafyToken");
const SsafyNFT = artifacts.require("SsafyNFT");
const DealFactory = artifacts.require("DealFactory");
const Funding = artifacts.require("Funding");
const NFT = artifacts.require("NFT");


module.exports = (deployer) =>{
  deployer.deploy(SsafyNFT); 
  deployer.deploy(SsafyToken, "SSAFY", "SSF", 0);
  deployer.deploy(DealFactory);
  deployer.deploy(Funding);
  deployer.deploy(NFT);
};
