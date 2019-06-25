pragma solidity^0.5.0;
pragma experimental ABIEncoderV2;

import "./Eigentumsdefinition.sol";


contract Generierung is Eigentumsdefinition{



    struct Combination{
        uint id_1;
        uint id_2;
    }
    Combination[] combinations;

    function canCombine(uint id_1, uint id_2) public view returns(bool){
        if(fraktale[id_1].vorgaenger1 != id_2 && fraktale[id_2].vorgaenger1 != id_1 && fraktale[id_1].vorgaenger2 != id_2 && fraktale[id_2].vorgaenger2 != id_1){
            for(uint i= 0;i<combinations.length; i++){
               if(combinations[i].id_1 == id_1 && combinations[i].id_2 == id_2 || combinations[i].id_1 == id_2 && combinations[i].id_2 == id_1){
                   return false;
               }
            }
            return true;
        }
        else{
            return false;
        }
    }

    function singlepoint_crossover(uint id_1, uint id_2) public view returns(FraktalErscheinung memory){
        uint[] memory kind  = new uint[](11);
        uint random_point = getRandomNumber(10);
        uint[11] memory  erscheinungId_1 = getFraktalFromId(id_1);
        uint[11] memory  erscheinungId_2 = getFraktalFromId(id_2);
        uint raritaet = getRandomNumberRarity();
        for(uint i=0;i<random_point;i++){
            kind[i] = uint(erscheinungId_1[i]);
        }
        for(uint i=random_point;i<11;i++){
            kind[i] = erscheinungId_2[i];
        }

        FraktalErscheinung memory erscheinung = FraktalErscheinung(kind[0],kind[1],kind[2],kind[3],kind[4],raritaet,Farbe(kind[6],kind[7],kind[8]),kind[9],kind[10]);
        return erscheinung;


    }

    function combine(uint id_1, uint id_2) internal returns(uint){
        require(canCombine(id_1,id_2));
            FraktalErscheinung memory erscheinung= singlepoint_crossover(id_1,id_2);
            uint gen_new = (id_1 < id_2 ? id_1 : id_2) + 1;
            Fraktal memory _fraktal = Fraktal(erscheinung,gen_new,false,false,id_1,id_2);
            uint _id = fraktale.push(_fraktal) - 1;
            _mint(msg.sender, _id);
            combinations.push(Combination(id_1,id_2));
            return _id;
    }
}
