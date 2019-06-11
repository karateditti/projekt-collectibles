pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";

contract Erscheinungsform is Zugangsbeschraenkung {
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

    function getFraktalFromId(uint id) public view returns(uint,uint,uint, uint, uint, uint, uint) {
        return (fraktale[id].winkel,fraktale[id].polygon, fraktale[id].segmente, fraktale[id].spiegelung, fraktale[id].iterationen, fraktale[id].farbe, fraktale[id].raritaet);
    }

    function getRandomNumber(uint rangeMax) public returns(uint){
        return uint(blockhash(block.number-1))%rangeMax +1;
    }
}
