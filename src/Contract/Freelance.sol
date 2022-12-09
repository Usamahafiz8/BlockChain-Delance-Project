// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Freelance {
    address public admin;
    string public freelancer;
    string public deadline;
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

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
    event myEventTest(string eventOutput);

    function set(string memory myText) public {
        storedData = myText;
        emit myEventTest(myText);
    }

    function setFreelance(string memory myText) public {
        freelancer = myText;
    }

    function setDeadline(string memory myText) public {
        deadline = myText;
    }

    function get() public view returns (string memory) {
        return storedData;
    }

    function getfreelancer() public view returns (string memory) {
        return freelancer;
    }

    function getdeadline() public view returns (string memory) {
        return deadline;
    }
}