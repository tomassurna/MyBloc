var MyBlock = artifacts.require("./MyBlock.sol");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(MyBlock, { from: accounts[0], gas: 6700000 });
};
