pragma solidity ^0.4.0;

contract CallerContract {
    //CalledContract toBeCalled = new CalledContract();
    
    // Use address of deployed contract if you retain the state of the CalledContract
    CalledContract toBeCalled = CalledContract(0xab7b9b6facec561e0c8c7da2444b890f1b624a2e);
    
    function getNumber() constant returns(uint) {
        return toBeCalled.getNumber();
    }

    // string cannot be returned from one contract to another contract
    // return byte32 format of the string and convert the number to
    // hexadecimal decoder to get the right string in your application
    function getWords() constant returns(bytes32) {
        return toBeCalled.getWords();
    }
}

contract CalledContract {
    uint number  = 42;
    //string words = "Hello World";
    bytes32 words = "Hello World";

    function getNumber() constant returns(uint) {
        return number;
    }
    
    function setNumber(uint _number) {
        number = _number;
    }

    function getWords() constant returns(bytes32) {
        return words;
    }
}