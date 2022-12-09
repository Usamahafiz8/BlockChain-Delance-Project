// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Lock {
    address public admin;
    address public freelancer;
    uint256 public deadline;
    string public storedData;    
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");
        require(msg.sender == owner, "You can't change the information");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
    event myEventTest(string eventOutput);

    function set(string memory myText) public {
        require(block.timestamp>=unlockTime, "You can't change the information");
        require(msg.sender == owner, "You aren't the owner");
        storedData = myText;
        emit myEventTest(myText);
    }

    function setFreelance(address _adress ) public {
        require( freelancer != admin, "Freeelancer can't be you or the onwer of the account");
        freelancer = _adress ;
    }

    function setDeadline(uint256 _deadline) public {
        require(block.timestamp<=unlockTime, "Deadline must be one day head");
        
        deadline = _deadline;
    }

    function get() public view returns (string memory) {
        return storedData;
    }

    function getfreelancer() public view returns (address _adress) {
        return freelancer;
    }

    function getdeadline() public view returns (uint256) {
        return deadline;
    }
}