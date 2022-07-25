const { assert, expect } = require("chai");
const { ethers } = require("hardhat");
describe("Simple Storage", () => {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favorite number: 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), "0");
    })

    it("Should update when call store", async() => {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    })
})