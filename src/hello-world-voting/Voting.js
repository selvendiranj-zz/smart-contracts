// ********************************************************
// 1. Setting up the development environment
// ********************************************************
/*
node -v
npm -v
npm install ethereumjs-testrpc
npm install web3
npm install solc
node_modules/.bin/testrpc
*/


// ********************************************************
// 2. Simple voting contract
// ********************************************************
let solc = require('solc');
let Web3 = require('web3');
let fs = require('fs');

//initialize the solc and web3 objects
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// To make sure web3 object is initialized 
// and can communicate with the blockchain, 
// let’s query all the accounts in the blockchain
console.log(web3.eth.accounts);

// To compile the contract, load the code from Voting.sol 
// in to a string variable and compile it
let code = fs.readFileSync('Voting.sol', 'utf8');
let compiledCode = solc.compile(code, 1);


/*
after compiling the code successfully and print the ‘contract’ object

compiledCode.contracts[‘:Voting’].bytecode:
    This is the bytecode you get when the source code in Voting.sol is compiled.
    This is the code which will be deployed to the blockchain.
compiledCode.contracts[‘:Voting’].interface:
    This is an interface or template of the contract (called abi) 
    which tells the contract user what methods are available in the contract. 
    Whenever you have to interact with the contract in the future, 
    you will need this abi definition. You can read more details about ABI here  
*/
console.log(compiledCode);
// console.log(web3.isConnected());
/*
Let’s now deploy the contract. You first create a contract object (VotingContract below) 
which is used to deploy and initiate contracts in the blockchain
*/
let contractInstance;
let byteCode = compiledCode.contracts[':VotingContract'].bytecode;
let abiDefinition = JSON.parse(compiledCode.contracts[':VotingContract'].interface);
let gasEstimate = web3.eth.estimateGas({ data: byteCode });

let VotingContract = web3.eth.contract(abiDefinition);
let deployedContract = VotingContract.new(['Rama', 'Nick', 'Jose'], {
    from: web3.eth.accounts[0],
    data: byteCode,
    gas: 4700000
}, sendMineCallback);

function sendMineCallback(e, contract) {
    if (!e) {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " +
                contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            console.log(contract);
            let contractAddress = contract.address;
            contractInstance = VotingContract.at(contractAddress);
            console.log(contractAddress);
            checkVotes(contractInstance);
        }
    }
}

function checkVotes(contractInstance) {
    // ********************************************************
    // 3. Interact with the contract in the nodejs console
    // ********************************************************
    if (contractInstance == 'undefined')
        return;
    console.log(contractInstance.totalVotesFor.call('Rama'));
    //Sample output: { [String: '0'] s: 1, e: 0, c: [ 0 ] }

    console.log(contractInstance.voteForCandidate('Rama', { from: web3.eth.accounts[0] }));
    //Sample transactionId: '0xdedc7ae544c3dde74ab5a0b07422c5a51b5240603d31074f5b75c0ebc786bf53'

    console.log(contractInstance.voteForCandidate('Rama', { from: web3.eth.accounts[0] }));
    //Sample transactionId: '0x02c054d238038d68b65d55770fabfca592a5cf6590229ab91bbe7cd72da46de9'

    console.log(contractInstance.voteForCandidate('Rama', { from: web3.eth.accounts[0] }));
    //Sample transactionId: '0x3da069a09577514f2baaa11bc3015a16edf26aad28dffbcd126bde2e71f2b76f'

    console.log(contractInstance.totalVotesFor.call('Rama').toLocaleString());
    //Sample output: '3'
}

//setInterval((contractInstance) => checkVotes(contractInstance), 2000);

// ********************************************************
// 4. Wait for the user to press any key and close app
// ********************************************************
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press any key to close the application', (answer) => {
    rl.close();
});