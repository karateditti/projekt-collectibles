const FullContract  = artifacts.require("FullContract");

module.exports = function(deployer) {
  deployer.deploy(FullContract);
};
