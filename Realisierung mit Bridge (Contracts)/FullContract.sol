pragma solidity^0.5.0;
pragma experimental ABIEncoderV2;

/*
    Dient als Schnittstelle für das Frontend. Während dem Entwicklungsprozess konnten hierdurch flexibel Smart Contracts hinzugefügt und entfernt werden.
*/

import "./Interaktion.sol";

contract FullContract is Interaktion{
    constructor() public{
        initialRandomNumbers(); // initial werden Zufallszahlen über das Oracle erzeugt.
    }
}
