pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "./Erscheinungsform.sol";

contract Eigentumsdefinition is ERC721Full, Erscheinungsform {
    uint constant anzahlStartFraktale = 3;
    // Muss angepasst werden, dass bei id = 999999999999999 kein "echtes" fraktal sein darf
    uint constant initialerVorgaenger = 999999999999999;
    address constant addresseInitialeGueter = address(0x123);
    constructor() ERC721Full("Fraktal", "FRK") public {}

    //initial mint - darf nur von verwaltender Einheit durchgeführt werden
    function mint() public {
        Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
        FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(3),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe,getRandomNumber(90),getRandomNumber(2));
        Fraktal memory _fraktal = Fraktal(erscheinung,0,false,false,initialerVorgaenger,initialerVorgaenger);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(msg.sender, _id);
    }

    function initialMint(uint amount) public onlyVE{
         //Adresse festlegen fuer Verwaltung von initalen Fraktalen
         //Aktuell: Alle Fraktale sehen gleich aus, die zum gleichen Zeitpunkt initial erzeugt werden
       for (uint i = 0; i < amount; i++) {
            Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255));
            FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(3),getRandomNumber(2),getRandomNumber(5), getRandomNumber(3),farbe, getRandomNumber(90),getRandomNumber(2));
            // Muss angepasst werden, dass bei id = 0 kein "echtes" fraktal sein darf
            Fraktal memory _fraktal = Fraktal(erscheinung,0,true,true,initialerVorgaenger,initialerVorgaenger);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(addresseInitialeGueter, _id);
        }
    }

    function firstMint() public{
        require(balanceOf(msg.sender)==0);
            for (uint i = 0; i < anzahlStartFraktale;i++) {
            mint();
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

    function getAllUsers() public view onlyVE returns (address[] memory){
       address[] memory x = new address[](fraktale.length);
       uint count = 0;
        for(uint i = 0; i < fraktale.length;i++){
            uint loop = count+1;
            for(uint j=0;j<loop;j++){
                if(x[j]==ownerOf(i)){
                    break;
                }
                if(x[j]!=ownerOf(i) && j==count){
                    x[count]= ownerOf(i);
                    count++;
                    }
                }

     }
        address[] memory users = new address[](count);
        for(uint i=0;i<count;i++) {
            users[i] = x[i];
        }

        return users;
    }

}
