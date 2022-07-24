
const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Please wait deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log("Deployed Contract to", simpleStorage.address)
  // console.log(network.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Wait for blocks confirmations...")
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }

  const currentFavoriteNumber = await simpleStorage.retrieve();
  console.log("Current favorite number: ", currentFavoriteNumber.toString());

  const transactionResponse = await simpleStorage.store("3");
  await transactionResponse.wait(1);

  const updatedFavoriteNumber = await simpleStorage.retrieve();
  console.log("Current favorite number: ", updatedFavoriteNumber.toString());
}

async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already Verified.");
    } else {
      console.log(error)
    }
  }

}

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//   const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

//   const lockedAmount = hre.ethers.utils.parseEther("1");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log("Lock with 1 ETH deployed to:", lock.address);
// }
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

main().then(() => process.exit(0)).catch((err) => console.error(err));
