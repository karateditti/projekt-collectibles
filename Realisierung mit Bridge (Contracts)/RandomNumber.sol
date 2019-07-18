pragma solidity^0.5.0;

import "./oraclizeAPI.sol";

contract RandomNumber is usingOraclize{
  uint public randomNumber;
  event LogNewRandomNumber(string number);
  event LogNewOraclizeQuery(string description);

    constructor() public{
      //OAR aus Ethereum-bridge übernehmen
        OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
        update();
    }

    function __callback(bytes32 queryId, string memory result) public{
      if(msg.sender != oraclize_cbAddress()) revert();
      emit LogNewRandomNumber(result);
      randomNumber = parseInt(result);
    }

    // API-Aufruf von random.org
    function update() public payable{
            emit LogNewOraclizeQuery("Oraclize query was sent, standing by for the answer..");
        bytes32 res =oraclize_query(
            "URL",
            "json(https://api.random.org/json-rpc/2/invoke).result.random.data.0",
            '\n{"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"5166d76a-14b3-42f3-a14b-52e4997d1c29","n":1,"min":1,"max":1000,"replacement":true,"base":10},"id":2994}');
    }

   function getRandomNumberResult() public view returns (uint){
      return randomNumber;
   }

}
