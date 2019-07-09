pragma solidity^0.5.0;

import "./Zugangsbeschraenkung.sol";
import "./Hilfsfunktionen.sol";

contract Erscheinungsform is Hilfsfunktionen{
   // Struktur RGB
    struct Farbe{
        uint rot;
        uint gruen;
        uint blau;
    }
    // Erscheinungsform eines Fraktals als Struktur
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

    // Erscheinungsform und weitere Eigenschaften eines Fraktals als Struktur
    struct Fraktal{
        FraktalErscheinung erscheinung;
        //Generation (Initial erzeugte Fraktale = Gen0)
        uint gen;
        bool zumKombinieren;
        // Die "Eltern" des Fraktals werden gespeichert als Vorgänger
        uint vorgaenger1;
        uint vorgaenger2;

    }

    // In  diesem Array werden die erzeugten Fraktale abgelegt
    Fraktal[] fraktale;


    // Erscheinungsform von einem Fraktal über die ID aufrufen
    function getFraktalFromId(uint id) public view returns(uint[11] memory) {
        uint[11] memory x = [uint(fraktale[id].erscheinung.winkel),fraktale[id].erscheinung.polygon,fraktale[id].erscheinung.segmente,fraktale[id].erscheinung.spiegelung,fraktale[id].erscheinung.iterationen,fraktale[id].erscheinung.raritaet,fraktale[id].erscheinung.farbe.rot,fraktale[id].erscheinung.farbe.gruen,fraktale[id].erscheinung.farbe.blau,fraktale[id].erscheinung.skew, fraktale[id].erscheinung.arms];
        return (x);
    }

    // Beide Vorgaenger eines Fraktals über die ID erhalten
    function getVorgaengerFromId(uint id) internal view returns(uint[2] memory){
        uint[2] memory x = [uint(fraktale[id].vorgaenger1),fraktale[id].vorgaenger2];
        return (x);
    }

    function getZumKombinieren(uint id) public view returns (bool){
        return fraktale[id].zumKombinieren;
    }

    function getGen(uint id) internal view returns (uint){
        return fraktale[id].gen;
    }

}
