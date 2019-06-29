pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";
import "./oraclizeAPI.sol";

contract Erscheinungsform is Zugangsbeschraenkung,usingOraclize  {
  uint public randomNumber;
  event LogNewRandomNumber(string number);
  event LogNewOraclizeQuery(string description);

    struct Farbe{
        uint rot;
        uint gruen;
        uint blau;
    }
    struct FraktalErscheinung{
        uint winkel;
        uint polygon;
        uint segmente;
        uint spiegelung;
        uint iterationen;
        uint raritaet;
        Farbe farbe;
        uint skew;
        uint arms;
    }

    struct Fraktal{
        FraktalErscheinung erscheinung;
        //Generation (Initial erzeugte Fraktale = Gen0)
        uint gen;
        bool zumTausch;
        bool zumKombinieren;
        // Die "Eltern" des Fraktals werden gespeichert als Vorgänger
        uint vorgaenger1;
        uint vorgaenger2;

    }

    constructor() public{
      //EDIT to correct OAR
      OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
    }

    Fraktal[] fraktale;

    function getFraktalFromId(uint id) public view returns(uint[11] memory) {
        uint[11] memory x = [uint(fraktale[id].erscheinung.winkel),fraktale[id].erscheinung.polygon,fraktale[id].erscheinung.segmente,fraktale[id].erscheinung.spiegelung,fraktale[id].erscheinung.iterationen,fraktale[id].erscheinung.raritaet,fraktale[id].erscheinung.farbe.rot,fraktale[id].erscheinung.farbe.gruen,fraktale[id].erscheinung.farbe.blau,fraktale[id].erscheinung.skew, fraktale[id].erscheinung.arms];
        return (x);
    }

    function getVorgaengerFromId(uint id) public view returns(uint[2] memory){
        uint[2] memory x = [uint(fraktale[id].vorgaenger1),fraktale[id].vorgaenger2];
        return (x);
    }

    function getRandomNumber(uint rangeMax) public view returns(uint){
        return uint(blockhash(block.number-1))%rangeMax +1;
    }

    function getRandomNumbers(uint rangeMax, uint amount) public view returns(uint[] memory){
        uint[] memory arrayNumbers = new uint[](amount);
        for(uint i=0; i <arrayNumbers.length;i++){
            arrayNumbers[i]=uint(blockhash(block.number-i+1))%rangeMax +1;
        }
        return arrayNumbers;
    }

    function getRandomNumberRarity() internal view returns(uint){
        uint random = getRandomNumber(100);
        uint[3] memory weight=[uint(31),71,101];
        uint[3] memory rarity=[uint(1),2,3];
        for(uint i=0;i<weight.length;i++){
            if(random<weight[i]){
                return rarity[i];
            }

        }
        return 0;
    }

    function getZumTausch(uint id) internal view returns (bool){
        return fraktale[id].zumTausch;
    }

    function getZumKombinieren(uint id) public view returns (bool){
        return fraktale[id].zumKombinieren;
    }

    function getGen(uint id) internal view returns (uint){
        return fraktale[id].gen;
    }


    function __callback(bytes32 queryId, string memory result) public{
      if(msg.sender != oraclize_cbAddress()) revert();

      emit LogNewRandomNumber(result);

      randomNumber = parseInt(result);
    }

    function update(uint rangeMax) public payable{
      emit LogNewOraclizeQuery("test should appear");

      if (oraclize_getPrice("WolframAlpha") > address(this).balance) {
            emit LogNewOraclizeQuery("Oraclize query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
            bytes32 res = oraclize_query("WolframAlpha",string(abi.encodePacked("random number between 1 and", " ", uintToString(rangeMax))));
      }
   }

   function getRandomNumber2() public view returns (uint){
      return randomNumber;
   }

   function uintToString(uint _i) internal pure returns (string memory _uintAsString) {
       if (_i == 0) {
           return "0";
       }
       uint j = _i;
       uint len;
       while (j != 0) {
           len++;
           j /= 10;
       }
       bytes memory bstr = new bytes(len);
       uint k = len - 1;
       while (_i != 0) {
           bstr[k--] = byte(uint8(48 + _i % 10));
           _i /= 10;
       }
       return string(bstr);
  }
}
