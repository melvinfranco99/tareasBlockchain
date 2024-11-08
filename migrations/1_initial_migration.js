const TareaContrato = artifacts.require("TareaContrato");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(TareaContrato);
  const tareaContrato = await TareaContrato.deployed()
};
