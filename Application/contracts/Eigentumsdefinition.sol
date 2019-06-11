pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';

contract Eigentumsdefinition is ERC721Full {
    bytes16 public string1 = "test1";
    constructor() ERC721Full("Fraktal", "FRK") public {}

    struct Fraktal{
        uint winkel;
        uint polygon;
        uint segmente;
        uint spiegelung;
        uint iterationen;
        uint farbe;
        uint raritaet;
    }

    Fraktal[] fraktale;

    function mint() public {
        Fraktal memory _fraktal = Fraktal(uint(now),uint(now-1000), uint(now-5500),uint(now-5500),uint(now-5500),uint(now-5500),uint(now-5500));
        uint _id = fraktale.push(_fraktal) - 1;
        _mint(msg.sender, _id);
    }


    function getFraktalFromId(uint id) public view returns(uint) {
        return (fraktale[id].winkel);
    }
}