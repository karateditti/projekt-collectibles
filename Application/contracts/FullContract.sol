pragma solidity^0.5.0;
pragma experimental ABIEncoderV2;

import "./Interaktion.sol";

contract FullContract is Interaktion{
    constructor() public{
        initialRandomNumbers();
    }
}
