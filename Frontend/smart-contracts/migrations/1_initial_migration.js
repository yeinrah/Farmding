//const Migrations = artifacts.require("Migrations");
const SSFToken = artifacts.require("SSFToken");
// const SsafyNFT = artifacts.require("SsafyNFT");
// const SaleFactory = artifacts.require("SaleFactory");
const CrowdFunding = artifacts.require("CrowdFunding");

/**
 * PJT Ⅰ/Ⅲ - 시나리오 테스트
 * @dev 
 * 올바른 테스트를 위해 
 * PJT Ⅰ - SsafyNFT
 * PJT Ⅲ - SsafyNFT, SsafyToken, SaleFactory
 * 가 배포되어야 합니다. 
 */
module.exports = function (deployer) {
  // deployer.deploy(SsafyNFT); 
  deployer.deploy(SSFToken, "SSAFY", "SSF", 0);
  // deployer.deploy(SaleFactory);
  deployer.deploy(CrowdFunding);
};
