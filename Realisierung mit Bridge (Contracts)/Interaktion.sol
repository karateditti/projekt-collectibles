pragma solidity^0.5.0;
pragma experimental ABIEncoderV2;

import "./Generierung.sol";

contract Interaktion is Generierung {

    // Fraktal zur Kombination freigeben, damit andere Benutzer ihre Fraktale mit diesen kombinieren können
    function zurKombinationFreigeben(uint id) public{
        require(ownerOf(id) == msg.sender);
        require(fraktale[id].zumKombinieren == false);
        fraktale[id].zumKombinieren = true;
    }

    // Freigabe des Fraktals wieder aufheben
    function zurKombinationEntfernen(uint id) public{
        require(ownerOf(id) == msg.sender);
        require(fraktale[id].zumKombinieren == true);
        fraktale[id].zumKombinieren = false;
    }

    function getAllzurKombinationFreigegeben() public view returns(uint[] memory){
        // Anzahl der zum Tausch verfügbaren Fraktalen muss zuerst ermittelt werden, um ein entsprechendes Array erzeugen zu können. Dynamische Arrays sind innerhalb einer Methode nicht umsetzbar (Solidity 0.5.0)
        uint amount = 0;
        for(uint i= 0;i<fraktale.length; i++){
            if(fraktale[i].zumKombinieren==true){
                amount++;
            }
        }
        //Array mit IDs der entsprechenden Fraktalen wird erzeugt
        uint[] memory fraktaleZumKombinieren = new uint[](amount);
        uint j = 0;
        for(uint i=0;i<fraktale.length; i++){
            if(fraktale[i].zumKombinieren==true){
                fraktaleZumKombinieren[j] = uint(i);
                j++;
            }
        }
        return fraktaleZumKombinieren;
    }

    function getAllzurKombinationFreigegebenExklusiveEigene() public view returns(uint[] memory){
        // Anzahl der zum Tausch verfügbaren Fraktalen muss zuerst ermittelt werden, um ein entsprechendes Array erzeugen zu können. Dynamische Arrays sind innerhalb einer Methode nicht umsetzbar (Solidity 0.5.0)
        uint amount = 0;
        for(uint i= 0;i<fraktale.length; i++){
            if(fraktale[i].zumKombinieren==true && ownerOf(i)!=msg.sender){
                amount++;
            }
        }
        //Array mit IDs der entsprechenden Fraktalen wird erzeugt
        uint[] memory fraktaleZumKombinieren = new uint[](amount);
        uint j = 0;
        for(uint i=0;i<fraktale.length; i++){
            if(fraktale[i].zumKombinieren==true && ownerOf(i)!=msg.sender){
                fraktaleZumKombinieren[j] = uint(i);
                j++;
            }
        }
        return fraktaleZumKombinieren;
    }

    // Kombination eines eigenen Fraktals mit einem Fraktal das zur Kombination Freigegeben wurde
    function combineExternal (uint id_1, uint id_2) public{
        require(fraktale[id_1].zumKombinieren==true);
        combine(id_1,id_2);
        fraktale[id_1].zumKombinieren=false;
    }

    // Kombination eigener Fraktale
    function combineInternal(uint id_1, uint id_2) public{
        require(ownerOf(id_1) == msg.sender && ownerOf(id_2) == msg.sender);
        combine(id_1,id_2);
    }

    // Alle Nutzer erhalten ein zufällig erzeugtes Fraktal
    function presentForAll() public onlyVE{
        address[]memory users = getAllUsers();
        for(uint i=0;i<users.length;i++){
            Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
            FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(3),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe, getRandomNumber(90),getRandomNumber(2));
            Fraktal memory _fraktal = Fraktal(erscheinung,0,true,initialerVorgaenger,initialerVorgaenger);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(users[i], _id);
        }
    }

    // Fraktale zur Kombination zur Verfügung stellen
    function generateForCombination(uint amount) public onlyVE{
        for (uint i = 0; i < amount; i++) {
            Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
            // Erscheinung mit: Winkel(max 360), Polygon(max 6), Segmente(max 5), Spiegelung(max 2), Iterationen(max 3), Rarität(max 3), farbe(3 x max 255), skew(max 90), arms(max 2)
            FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(3), getRandomNumberRarity(),farbe,getRandomNumber(90),getRandomNumber(2));
            Fraktal memory _fraktal = Fraktal(erscheinung,0,true,initialerVorgaenger,initialerVorgaenger);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(addresseInitialeGueter, _id); // ERC721 OpenZeppelin Implementierung
        }
    }

}
