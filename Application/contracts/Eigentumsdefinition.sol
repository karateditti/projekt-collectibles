pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "./Erscheinungsform.sol";

contract Eigentumsdefinition is ERC721Full, Erscheinungsform {
    constructor() ERC721Full("Fraktal", "FRK") public {}


    //initial mint - darf nur von verwaltender Einheit durchgeführt werden
    function mint() public {
        Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
        FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe,getRandomNumber(90),getRandomNumber(2));
        // Muss angepasst werden, dass bei id = 0 kein "echtes" fraktal sein darf
        Fraktal memory _fraktal = Fraktal(erscheinung,0,false,0,0);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(msg.sender, _id);
    }

    function initialMint(uint amount) public {
        // Adresse festlegen fuer Verwaltung von initalen Fraktalen
        // Aktuell: Alle Fraktale sehen gleich aus, die zum gleichen Zeitpunkt initial erzeugt werden
        address x = address(0x123);
        for (uint i = 0; i < amount; i++) {
            Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
            FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe, getRandomNumber(90),getRandomNumber(2));
            // Muss angepasst werden, dass bei id = 0 kein "echtes" fraktal sein darf
            Fraktal memory _fraktal = Fraktal(erscheinung,0,true,0,0);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(x, _id);
        }
    }

    function getAllZumVerkauf() public view returns(uint[] memory){
        // Anzahl der zum Verkauf verfügbaren Fraktalen muss zuerst ermittelt werden, um ein entsprechendes Array erzeugen zu können. Dynamische Arrays sind innerhalb einer Methode nicht umsetzbar (Solidity 0.5.0)
        uint amount = 0;
        for(uint i= 0;i<fraktale.length; i++){
            if(fraktale[i].zumVerkauf==true){
                amount++;
            }
        }
        //Array mit IDs der entsprechenden Fraktalen wird erzeugt
        uint[] memory fraktaleZumVerkauf = new uint[](amount);
        uint j = 0;
        for(uint i=0;i<fraktale.length; i++){
            if(fraktale[i].zumVerkauf==true){
                fraktaleZumVerkauf[j] = uint(i);
                j++;
            }
        }
        return fraktaleZumVerkauf;
        }

    function zumVerkaufFreigeben(uint id) public{
        if(getZumVerkauf(id)) {
            //bereits freigegeben
        }
        else{
            fraktale[id].zumVerkauf = true;
        }
    }

    function fraktalKaufen(uint id) public{
        if(fraktale[id].zumVerkauf==true){
            _transferFrom(ownerOf(id),msg.sender,id);
            fraktale[id].zumVerkauf = false;
        }
    }
}