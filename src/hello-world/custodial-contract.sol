pragma solidity ^0.4.0;

contract CustodialContract {
    
    address client;
    bool public _switch = false;
    
    function CustodialContract() {
        client = msg.sender;    
    }
    
    modifier ifClient() {
        require(msg.sender == client);
        _;
    }
    
    function depositFunds() payable {
        
    }
    
    function withdrawFunds(uint amount) ifClient {
        if (client.send(amount)) {
            _switch = true;
        } else {
            _switch = false;
        }
    }
    
    function getFunds() constant ifClient returns(uint) {
        return this.balance;    
    }
}