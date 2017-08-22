pragma solidity ^0.4.0;

contract PayableContract {

    // Do not ever create a payable constructor
    function PayableContract() {
        
    }
    
    function receiveFunds() payable {
        
    }
    
    function getter() constant returns(uint) {
        return this.balance;
    }
}