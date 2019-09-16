App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    console.log("inti");

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON('Bitjob.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
    //   var bitjob = web3.eth.contract(var bitjobContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_company","type":"string"},{"name":"_title","type":"string"},{"name":"_description","type":"string"},{"name":"_salary","type":"uint256"}],"name":"addjob","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_jobId","type":"uint256"}],"name":"applyJob","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_jobId","type":"uint256"}],"name":"endVacancy","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"employer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"idGenerator","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_jobId","type":"uint256"}],"name":"displayJob","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"desc","type":"string"},{"indexed":false,"name":"company","type":"string"},{"indexed":false,"name":"jobId","type":"uint256"}],"name":"LogEventAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"buyer","type":"address"},{"indexed":false,"name":"jobId","type":"uint256"},{"indexed":false,"name":"numTickets","type":"uint256"}],"name":"LogBuyTickets","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"accountRefunded","type":"address"},{"indexed":false,"name":"jobId","type":"uint256"},{"indexed":false,"name":"numTickets","type":"uint256"}],"name":"LogGetRefund","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"employer","type":"address"},{"indexed":false,"name":"balance","type":"uint256"},{"indexed":false,"name":"jobID","type":"uint256"}],"name":"LogEndSale","type":"event"}]);
    // );


    console.log("contract");
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract(AdoptionArtifact);
    
      // Set the provider for our contract
      App.contracts.Adoption.setProvider(App.web3Provider);

      console.log(AdoptionArtifact);

      App.contracts.Adoption.deployed().then(function(instance){
        jobinstance = instance;
  
        jobinstance.addjob("has","asdfh","asdf",12);
    
    });

    })
  },

  applyjob: function() {
    var jobinstance

    App.contracts.Adoption.deployed().then(function(instance){
      jobinstance = instance;

      var job = document.getElementById("apply");
      job.addEventListener("click",jobinstance.applyjob(1));

    }) 
  }




};

$(function() {
  $(window).load(function() {
    console.log("init");
    App.init();
  });
});
