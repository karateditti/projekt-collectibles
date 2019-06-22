pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "./Erscheinungsform.sol";

contract Eigentumsdefinition is ERC721Full, Erscheinungsform {
    uint[] random;
    constructor() ERC721Full("Fraktal", "FRK") public {}

    //initial mint - darf nur von verwaltender Einheit durchgeführt werden
    function mint() public {
        Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
        FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe,getRandomNumber(90),getRandomNumber(2));
        // Muss angepasst werden, dass bei id = 999999999999999 kein "echtes" fraktal sein darf
        Fraktal memory _fraktal = Fraktal(erscheinung,0,false,false,999999999999999,999999999999999);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(msg.sender, _id);
    }

    function initialMint(uint amount) public {
         //Adresse festlegen fuer Verwaltung von initalen Fraktalen
         //Aktuell: Alle Fraktale sehen gleich aus, die zum gleichen Zeitpunkt initial erzeugt werden
        address x = address(0x123);
       for (uint i = 0; i < amount; i++) {
            Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
            FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe, getRandomNumber(90),getRandomNumber(2));
            // Muss angepasst werden, dass bei id = 0 kein "echtes" fraktal sein darf
            Fraktal memory _fraktal = Fraktal(erscheinung,0,true,true,999999999999999,999999999999999);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(x, _id);
        }
    }

    function firstMint() public{
        if(balanceOf(msg.sender)==0){
            for (uint i = 0; i < 5;i++) {
            mint();
            }
        }
        else{
            // User hat bereits Fraktale
        }
    }

    function getAllZumTausch() public view returns(uint[] memory){
        // Anzahl der zum Tausch verfügbaren Fraktalen muss zuerst ermittelt werden, um ein entsprechendes Array erzeugen zu können. Dynamische Arrays sind innerhalb einer Methode nicht umsetzbar (Solidity 0.5.0)
        uint amount = 0;
        for(uint i= 0;i<fraktale.length; i++){
            if(fraktale[i].zumTausch==true){
                amount++;
            }
        }
        //Array mit IDs der entsprechenden Fraktalen wird erzeugt
        uint[] memory fraktaleZumTausch = new uint[](amount);
        uint j = 0;
        for(uint i=0;i<fraktale.length; i++){
            if(fraktale[i].zumTausch==true){
                fraktaleZumTausch[j] = uint(i);
                j++;
            }
        }
        return fraktaleZumTausch;
        }

    function zumTauschFreigeben(uint id) public{
        if(getZumTausch(id)) {
            //bereits freigegeben
        }
        else{
            fraktale[id].zumTausch = true;
        }
    }

    function getFraktaleFromUser(address add) public view returns (uint[] memory){
        uint amountPersonalFractals = balanceOf(add);
        uint[] memory allFracalsOfUser= new uint [](amountPersonalFractals);
        uint totalFractals = totalSupply();
        uint count = 0;
        for(uint i = 0; i < totalFractals;i++){
            if(ownerOf(i)==add){
                allFracalsOfUser[count]=i;
                count++;
            }
        }
        return allFracalsOfUser;
    }

}
