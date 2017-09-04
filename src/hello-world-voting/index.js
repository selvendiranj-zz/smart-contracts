web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var content;
jQuery.getJSON('index.json', function(data) {
    // data is an array of objects
    content = data;
    $.each(data, function() {
        console.log(this.title); // log each title
    });
});


var abi = JSON.parse(content);
VotingContract = web3.eth.contract(abi);


// In your nodejs console, execute contractInstance.address to 
// get the address at which the contract is deployed and change
// the line below to use your deployed address
contractInstance = VotingContract.at('0x2a9c1d265d06d47e8f7b00ffa987c9185aecf672');
candidates = { "Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3" }

function voteForCandidate() {
    candidateName = $("#candidate").val();
    contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[0] }, function() {
        let div_id = candidates[candidateName];
        $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    });
}


$(document).ready(function() {
    candidateNames = Object.keys(candidates);
    for (var i = 0; i < candidateNames.length; i++) {
        let name = candidateNames[i];
        let val = contractInstance.totalVotesFor.call(name).toString()
        $("#" + candidates[name]).html(val);
    }
});