var web3;
var abiContract;
var votingContract;
var contractAddress;
var contractInstance;

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
contractAddress = '0xb85e48407f5eecf87ed2bda425ca58fc3bda16be';
candidates = { "Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3" }

var readContract = function() {

    jQuery.getJSON('/index.json', function(data) {
        // data is an array of objects
        abiContract = data;
        votingContract = web3.eth.contract(abiContract);
        contractInstance = votingContract.at(contractAddress);
    });

}

var getVotesForCandidate = function(candidateName) {
    let div_id = candidates[candidateName];
    let val = contractInstance.totalVotesFor.call(candidateName).toString();
    $("#" + div_id).html(val);
}

/*
In your nodejs console, execute contractInstance.address to 
get the address at which the contract is deployed and change
the line below to use your deployed address
*/
var voteForCandidate = function() {

    var candidateName = $("#candidate").val();
    contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function() {
        getVotesForCandidate(candidateName);
    });
}

var getVotesForAll = function() {

    var candidateNames = Object.keys(candidates);

    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        getVotesForCandidate(name);
    }
}

$(document).ready(function() {

    readContract();
    setTimeout(getVotesForAll, 5000);

});