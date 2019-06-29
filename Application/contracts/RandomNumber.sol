pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";
import "./oraclizeAPI.sol";

contract RandomNumber is usingOraclize{
  uint public randomNumber;
  event LogNewRandomNumber(string number);
  event LogNewOraclizeQuery(string description);

    constructor() public{
      //EDIT to correct OAR
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        update(

        );
    }

    function __callback(bytes32 queryId, string memory result) public{
      if(msg.sender != oraclize_cbAddress()) revert();

      emit LogNewRandomNumber(result);

      randomNumber = parseInt(result);
    }

    function update() public payable{
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        bytes32 res =oraclize_query(
            "URL",
            "json(https://api.random.org/json-rpc/2/invoke).result.random.data.0",
            '\n{"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"980f0b68-1810-4803-aca0-717f07b58160","n":30,"min":1,"max":1000,"replacement":true,"base":10},"id":2994}');
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
