pragma solidity ^0.5.0;

import "./RandomNumber.sol";
import "./Zugangsbeschraenkung.sol";

contract Hilfsfunktionen is Zugangsbeschraenkung{

    uint constant anzahlInitialRndm = 100; //Anzahl initial erzeugter Zufallszahlen
    RandomNumber[] rndm; // Array an Objekten von RandomNumber. Hier werden die API-Aufrufe ausgeführt
    uint[] randomNumbers; // Array an generierten Zufallszahlen
    uint indexRandomNumbers; // Hochzählen des Indexs, wenn Zufallszahl bereits genutzt wurde.


    function getRandomNumberRarity() internal returns(uint){ //Erstellung einer Zufallszahl nach diskreter Verteilungsfunktion
        uint random = getRandomNumber(101); // Zufallszahl zwischen 1 und 101
        uint[3] memory weight=[uint(32),72,102]; // Gewichtung der Wahrscheinlichkeit für 1,2 und 3
        uint[3] memory rarity=[uint(1),2,3]; // Raritäten 1 - 3
        for(uint i=0;i<weight.length;i++){
            if(random<weight[i]){
                return rarity[i];
            }

        }
        return 0;
    }

    function initialRandomNumbers() public onlyVE{ // Erzeugt initial 100 Zufallszahlen durch die Random.org API
        for(uint i = 1; i < anzahlInitialRndm +1; i++) {
            rndm.push(new RandomNumber());
        }
    }

    function substring(string memory str) internal returns(string memory){ // Entfernt erstes und letztes Element einer Zeichenkette
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(strBytes.length-2);
        for(uint i = 1; i < strBytes.length-1; i++) {
            result[i-1] = strBytes[i];
        }
        return string(result);
    }

    function split(string memory _base, string memory _value) // Trennt Zeichenkette durch ein Trennzeichen in ein Array
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

    function setRndm() public onlyVE returns(uint[] memory){ // Schreibt die Zufallszahlen aus den einzelnen API-Aufrufen in das Array an Zufallszahlen
        for(uint i=0; i<rndm.length;i++){
            randomNumbers.push(rndm[i].getRandomNumberResult());
        }
        return randomNumbers;

    }

    function getRandomNumber(uint rangeMax) internal returns(uint){ //Erzeugt eine Zufallszahl innerhalb einer Range von 1 - rangeMax
        if(randomNumbers.length==0 ||randomNumbers.length== anzahlInitialRndm -1 ){
            setRndm();
        }
        uint i = indexRandomNumbers;
        indexRandomNumbers++; // Index + 1, damit Zufallszahl nicht erneut verwendet wird.
        return (randomNumbers[i]%rangeMax +1);
    }
}

