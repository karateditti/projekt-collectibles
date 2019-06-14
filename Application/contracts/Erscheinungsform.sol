pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";

contract Erscheinungsform is Zugangsbeschraenkung {

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
    }

    struct Fraktal{
        FraktalErscheinung erscheinung;
        //Generation (Initial erzeugte Fraktale = Gen0)
        uint gen;
        bool zumVerkauf;
        // Die "Eltern" des Fraktals werden gespeichert als Vorgänger
        uint vorgaenger1;
        uint vorgaenger2;

    }

    Fraktal[] fraktale;

    function getFraktalFromId(uint id) public view returns(uint[9] memory) {
        uint[9] memory x = [uint(fraktale[id].erscheinung.winkel),fraktale[id].erscheinung.polygon,fraktale[id].erscheinung.segmente,fraktale[id].erscheinung.spiegelung,fraktale[id].erscheinung.iterationen,fraktale[id].erscheinung.raritaet,fraktale[id].erscheinung.farbe.rot,fraktale[id].erscheinung.farbe.gruen,fraktale[id].erscheinung.farbe.blau];
        return (x);
    }

    function getVorgaengerFromId(uint id) public view returns(uint[2] memory){
        uint[2] memory x = [uint(fraktale[id].vorgaenger1),fraktale[id].vorgaenger1];
        return (x);
    }

    function getRandomNumber(uint rangeMax) public returns(uint){
        return uint(blockhash(block.number-1))%rangeMax +1;
    }

    function getZumVerkauf(uint id) public view returns (bool){
        return fraktale[id].zumVerkauf;
    }

    function getGen(uint id) public view returns (uint){
        return fraktale[id].gen;
    }
}
