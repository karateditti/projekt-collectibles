pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";
import "./Hilfsfunktionen.sol";

contract Erscheinungsform is Zugangsbeschraenkung, Hilfsfunktionen{

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

    Fraktal[] fraktale;

    function getFraktalFromId(uint id) public view returns(uint[11] memory) {
        uint[11] memory x = [uint(fraktale[id].erscheinung.winkel),fraktale[id].erscheinung.polygon,fraktale[id].erscheinung.segmente,fraktale[id].erscheinung.spiegelung,fraktale[id].erscheinung.iterationen,fraktale[id].erscheinung.raritaet,fraktale[id].erscheinung.farbe.rot,fraktale[id].erscheinung.farbe.gruen,fraktale[id].erscheinung.farbe.blau,fraktale[id].erscheinung.skew, fraktale[id].erscheinung.arms];
        return (x);
    }

    function getVorgaengerFromId(uint id) public view returns(uint[2] memory){
        uint[2] memory x = [uint(fraktale[id].vorgaenger1),fraktale[id].vorgaenger2];
        return (x);
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

}
