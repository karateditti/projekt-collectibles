pragma solidity ^0.5.0;

import "./RandomNumber.sol";
contract Hilfsfunktionen{

    uint constant anzahlInitialRndm = 100;
    uint constant rndmBound = 70;
    RandomNumber[] rndm;
    uint[] randomNumbers;
    uint indexRandomNumbers;


    function getRandomNumberRarity() internal returns(uint){
        uint random = getRandomNumber(100);
        uint[3] memory weight=[uint(31),71,101];
        uint[3] memory rarity=[uint(1),2,3];
        for(uint i=0;i<weight.length;i++){
            if(random<weight[i]){
                return rarity[i];
            }

        }
        return 0;
    }

    function initialRandomNumbers() public{
        for(uint i = 1; i < anzahlInitialRndm +1; i++) {
            rndm.push(new RandomNumber());
        }
    }

    function substring(string memory str) internal returns(string memory){
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(strBytes.length-2);
        for(uint i = 1; i < strBytes.length-1; i++) {
            result[i-1] = strBytes[i];
        }
        return string(result);
    }

    function split(string memory _base, string memory _value)
    internal
    returns (string[] memory splitArr){
        bytes memory _baseBytes = bytes(_base);

        uint _offset = 0;
        uint _splitsCount = 1;
        while (_offset < _baseBytes.length - 1) {
            int _limit = _indexOf(_base, _value, _offset);
            if (_limit == -1)
                break;
            else {
                _splitsCount++;
                _offset = uint(_limit) + 1;
            }
        }

        splitArr = new string[](_splitsCount);

        _offset = 0;
        _splitsCount = 0;
        while (_offset < _baseBytes.length - 1) {

            int _limit = _indexOf(_base, _value, _offset);
            if (_limit == - 1) {
                _limit = int(_baseBytes.length);
            }

            string memory _tmp = new string(uint(_limit) - _offset);
            bytes memory _tmpBytes = bytes(_tmp);

            uint j = 0;
            for (uint i = _offset; i < uint(_limit); i++) {
                _tmpBytes[j++] = _baseBytes[i];
            }
            _offset = uint(_limit) + 1;
            splitArr[_splitsCount++] = string(_tmpBytes);
        }
        return splitArr;
    }

    function _indexOf(string memory _base, string memory _value, uint _offset)
    internal
    pure
    returns (int) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);

        assert(_valueBytes.length == 1);

        for (uint i = _offset; i < _baseBytes.length; i++) {
            if (_baseBytes[i] == _valueBytes[0]) {
                return int(i);
            }
        }

        return -1;
    }

    function setRndm() public returns(uint[] memory){
        for(uint i=0; i<rndm.length;i++){
       // string memory x = rndm[i].getRandomNumber2();
       // string memory result_trimmed = substring(x);
       // string[] memory splitted_result = split(result_trimmed,",");
            randomNumbers.push(rndm[i].getRandomNumber2());

        }
        return randomNumbers;

    }

    function getRandomNumber(uint rangeMax) public returns(uint){
        if(randomNumbers.length==0 ||randomNumbers.length== anzahlInitialRndm -1 ){
            setRndm();
        }
        if(randomNumbers.length==rndmBound){
            initialRandomNumbers();
        }
        uint i = indexRandomNumbers;
        indexRandomNumbers++;
        return (randomNumbers[i]%rangeMax +1);
    }

    function getLengthRndm() public view returns(uint){
        return rndm.length;
    }

    function getLengthIntRndm() public view returns(uint){
        return randomNumbers.length;
    }

    function parseInt(string memory _a, uint _b) internal pure returns (uint _parsedInt) {
        bytes memory bresult = bytes(_a);
        uint mint = 0;
        bool decimals = false;
        for (uint i = 0; i < bresult.length; i++) {
            if ((uint(uint8(bresult[i])) >= 48) && (uint(uint8(bresult[i])) <= 57)) {
                if (decimals) {
                    if (_b == 0) {
                        break;
                    } else {
                        _b--;
                    }
                }
                mint *= 10;
                mint += uint(uint8(bresult[i])) - 48;
            } else if (uint(uint8(bresult[i])) == 46) {
                decimals = true;
            }
        }
        if (_b > 0) {
            mint *= 10 ** _b;
        }
        return mint;
    }
}

