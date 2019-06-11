pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "./Erscheinungsform.sol";

contract Eigentumsdefinition is ERC721Full, Erscheinungsform {
    bytes16 public string1 = "test1";
    constructor() ERC721Full("Fraktal", "FRK") public {}


    //initial mint - darf nur von verwaltender Einheit durchgeführt werden
    function mint() public {

        Fraktal memory _fraktal = Fraktal(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(10),getRandomNumber(255), getRandomNumber(3));
        uint _id = fraktale.push(_fraktal) - 1;
        _mint(msg.sender, _id);
    }


}