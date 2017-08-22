pragma solidity ^0.4.0;

contract HelloWorldContract {
    
    string word = "Hello World";
    string name = "Selvendiran";
    address issuer;

    function HelloWorldContract() {
        issuer = msg.sender;
    }
    
    modifier ifIssuer() {
        
        // Check if the issue is the sender
        require(issuer == msg.sender);

        // inform the external code to continue execution
        _;

        //if (issuer != msg.sender) {
        //    throw;
        //} else {
        //    _; // Undescore means continue;
        //}
    }

    function getWord() constant returns(string) {
        return word;   
    }

    function setWord(string newWord) returns(string) {
        if (issuer != msg.sender) {
            return "This is not the creator!";
        } else {
            word = newWord;
            return "This is the creator!";
        }
    }

    function getName() constant returns(string) {
        return name;
    }

    function setName(string newName) ifIssuer returns(string) {
        name = newName;
        return "This is the creator!";
    }
}