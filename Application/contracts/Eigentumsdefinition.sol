pragma solidity^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import "./Erscheinungsform.sol";

contract Eigentumsdefinition is ERC721Full, Erscheinungsform {
    uint constant anzahlStartFraktale = 3;
    // Muss angepasst werden, dass bei id = 999999999999999 kein "echtes" fraktal sein darf
    uint constant initialerVorgaenger = 999999999999999;
    address constant addresseInitialeGueter = address(0x123);
    constructor() ERC721Full("Fraktal", "FRK") public {} // Name der Token: Fraktal mit Abkürzung FRK

    //initial mint - darf nur von verwaltender Einheit durchgeführt werden
    function mint() public {
        Farbe memory farbe = Farbe(getRandomNumber(255),getRandomNumber(255),getRandomNumber(255)); // RGB-Code
        // Erscheinung mit: Winkel(max 360), Polygon(max 6), Segmente(max 5), Spiegelung(max 2), Iterationen(max 3), Rarität(max 3), farbe(3 x max 255), skew(max 90), arms(max 2)
        FraktalErscheinung memory erscheinung = FraktalErscheinung(getRandomNumber(360),getRandomNumber(6), getRandomNumber(5),getRandomNumber(2),getRandomNumber(3), getRandomNumberRarity(),farbe,getRandomNumber(90),getRandomNumber(2));
        Fraktal memory _fraktal = Fraktal(erscheinung,0,false,initialerVorgaenger,initialerVorgaenger);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(msg.sender, _id); // ERC721 OpenZeppelin Implementierung
    }

    // Nutzer soll zu Beginn Fraktale ohne weitere Bedingungen bekommen
    function firstMint() public{
        require(balanceOf(msg.sender)==0); // Falls Nutzer noch keine Fraktale besitzt
            for (uint i = 0; i < anzahlStartFraktale;i++) {
            mint();
            }
    }

    // Alle Fraktale von einem Nutzer ausgeben
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

    // alle Benutzer die ein Fraktal besitzen ausgeben
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
