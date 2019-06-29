var FullContract = artifacts.require("FullContract");

contract("2nd MetaCoin test", async accounts => {
    it("should put 10000 MetaCoin in the first account", async () => {
        let instance = await FullContract.deployed();
        let balance = await instance.balanceOf(accounts[0]);
        assert.equal(balance.valueOf(),0);
    });
});

