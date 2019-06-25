pragma solidity ^0.5.0;

contract Zugangsbeschraenkung {
    constructor() public {verwaltendeEinheit = msg.sender;}
    address payable verwaltendeEinheit;

    // Definition eines Modifiers zur Beschraenkung von Funktionalitäten auf ausgewählte Accounts
    modifier onlyVE {
        require(
            msg.sender == verwaltendeEinheit,
            "Nur die verwaltende Einheit kann diese Methoden aufrufen."
        );
        _;
    }
}

