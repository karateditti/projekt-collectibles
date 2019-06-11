const Eigentumsdefinition  = artifacts.require("Eigentumsdefinition");

module.exports = function(deployer) {
  deployer.deploy(Eigentumsdefinition);
};
