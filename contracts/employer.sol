pragma solidity ^0.5.0;

contract Bitjob {

    address payable public employer;
    uint  JOB_TICKET = 100 wei;

    uint public idGenerator;


    struct job{
        string company;
        string title;
        string description;
        uint salary;
        mapping(address => uint) employee;
        bool isOpen;
        address applicant;
    }

    mapping(uint => job) events;

    event LogEventAdded(string desc, string company, uint jobId);
    event LogBuyTickets(address buyer, uint jobId, uint numTickets);
    event LogGetRefund(address accountRefunded, uint jobId, uint numTickets);
    event LogEndSale(address employer, uint balance, uint jobID);
  
    modifier OnlyEmployer {
        require(employer == msg.sender,"you are not employer");
        _;
    }

    constructor() public {
        employer = msg.sender;
    }


 function addjob (string memory _company,
                        string memory _title,
                        string memory _description,
                        uint _salary) 
                        OnlyEmployer public returns(uint){
        uint jobId = idGenerator;
        idGenerator++;
        events[jobId] = job({description: _description, 
                                     company: _company,
                                     title:_title,
                                     salary:_salary,
                                     applicant:address(0),
                                     isOpen: true });

        
        emit LogEventAdded(_description,_company,jobId);
        return (jobId);
    }
    
     function displayJob(uint _jobId) public view returns(string memory,string memory,string memory,uint,address,bool){
        
        job storage ent = events[_jobId];

        return(ent.company,
               ent.title,
               ent.description,
               ent.salary,
               ent.applicant,
               ent.isOpen);
    } 

    function applyJob(uint _jobId) public payable {
        
        job storage ent = events[_jobId];
        
        require(ent.applicant == address(0),"job is already taken");
        require(ent.isOpen == true,"job is Closed");
        
        ent.applicant=address(this);
        
        

    }
    
    function endVacancy(uint _jobId) OnlyEmployer public {
        job storage ent = events[_jobId];
        
        ent.isOpen = false;    
    }
}
