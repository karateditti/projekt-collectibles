pragma solidity ^0.5.0;
/*
    Beschränkung von Funktionalitäten auf ausgewählte Accounts (Verwaltende Einheit)
    Hier ist die verwaltende Einheit, die Addresse von der aus der Contract deployed wird.
*/

contract Zugangsbeschraenkung{
    address payable verwaltendeEinheit; // Addresse der verwaltenden Einheit
    constructor() public {verwaltendeEinheit = msg.sender;} // verwaltende Einheit = Addresse von der aus der Contract deployed wird

    /*
    Definition eines Modifiers zur Beschraenkung von Funktionalitäten auf ausgewählte Accounts.
    Methoden mit dem Zusatz "onlyVE" können somit nur von der verwaltenden Einheit ausgeführt werden.
*/
    modifier onlyVE {
        require(
            msg.sender == verwaltendeEinheit,
            "Nur die verwaltende Einheit kann diese Methoden aufrufen."
        );
        _;
    }
}

