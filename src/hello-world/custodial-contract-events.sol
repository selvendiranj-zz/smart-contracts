pragma solidity ^0.4.0;

contract CustodialContractEvents {
    
    address client;
    bool public _switch = false;
    
    event UpdateStatus(string _msg);
    event UserStatus(string _msg, address _user, uint _amount);
    
    function CustodialContractEvents() {
        client = msg.sender;    
    }
    
    modifier ifClient() {
        require(msg.sender == client);
        _;
    }
    
    function depositFunds() payable {
        UserStatus("User transferred some money", msg.sender, msg.value);
    }
    
    function withdrawFunds(uint amount) ifClient {
        if (client.send(amount)) {
            UpdateStatus("User withdrawn some money");
            _switch = true;
        } else {
            _switch = false;
        }
    }
    
    function getFunds() constant ifClient returns(uint) {
        UpdateStatus("Someone verifying thier fund balance");
        return this.balance;    
    }
}