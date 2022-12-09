import "./Freelance.css";
import React, { useState } from "react";
import { ethers } from "ethers";
import Freelance_abi from "../Contract/Freelance_abi.json";

const Freelance = () => {
  // deploy simple storage contract and paste deployed contract address here.
  let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  // const [freelancerContract, setfreelancerContract] = useState();

  const [currentContractVal, setCurrentContractVal] = useState(null);
  const [freelanceraddress, setfreelanceraddress] = useState(null);
  const [contractadminaddress, setcontractadminaddress] = useState(null);
  const [contractdeadline, setcontractdeadline] = useState(null);
  const [maincontractaddress, setmaincontractaddress] = useState(null);
  const [contract, setContract] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);


  const connectWalletHandler = () => {

    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    updateEthers();
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  const updateEthers = () => {
    let tempProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
    // let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(
      contractAddress,
      Freelance_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const setHandler = (event) => {
    event.preventDefault();
    console.log("sending " + event.target.setText.value + " to the contract");
    console.log(
      "freelance " + event.target.freelanceraddress.value + " to the contract"
    );
    console.log("deadline " + event.target.deadline.value + " to the contract");
    contract.set(event.target.setText.value);
    contract.setFreelance(event.target.freelanceraddress.value);
    contract.setDeadline(event.target.deadline.value);
  };


  console.log(contract);
  const getCurrentVal = async () => {
    try {
      let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      let tempSigner = tempProvider.getSigner();
      let tempContract = new ethers.Contract(
        contractAddress,
        Freelance_abi,
        tempSigner
      );

      let val = await tempContract.get();
      let address = await tempContract.getfreelancer();
      let deadline = await tempContract.getdeadline();
      console.log(val);
      console.log(contractAddress);
      console.log(defaultAccount);
      console.log(deadline);
      setCurrentContractVal(val);
      setmaincontractaddress(contractAddress);
      setcontractadminaddress(defaultAccount);
      setfreelanceraddress(address);
      setcontractdeadline(deadline);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="body">
      <div className="block">
        <h1>Freelance Smart Contract</h1>
        <div className="input-box">
          <div className="wallet">
            <button onClick={connectWalletHandler}>{connButtonText}</button>
            <hr color="black" />
            <label>MetaMask Address : {defaultAccount}</label>
            <label>Contract Address : {contractAddress} </label>
            <hr color="black" />
          </div>

          <div className="Context">
            <form onSubmit={setHandler}>
              <label>Freelancer Address :</label>
              <input id="freelanceraddress" type="text" />
              <label>Deadline Date:</label>
              <input id="deadline" type="text" />
              <label>Contract Details :</label>
              <input id="setText" type="text" />
              <button type={"submit"}> Save Contract Info </button>
            </form>
          </div>
        </div>
      </div>
      <div className="info">
        <h1> Contract Infomation</h1>
        <div className="button">
          <button onClick={getCurrentVal}> Show Contract infomation </button>
          <hr color="black" />
        </div>
        <label>
          Contract Address:
          <input
            color="black"
            userselect={"none"}
            placeholder={maincontractaddress}
          />
        </label>{" "}
        <label>
          {" "}
          Admin Address:
          <input color="black" placeholder={contractadminaddress} />
        </label>
        <label>
          {" "}
          Freelancer Address:
          <input color="black" placeholder={freelanceraddress} />
        </label>
        <label>
          {" "}
          Deadline:
          <input color="black" placeholder={contractdeadline} />
        </label>
        <label>
          {" "}
          Freelance Contract Details:
          <input
            id={currentContractVal}
            color="black"
            placeholder={currentContractVal}
          />
          <hr color="black" />
        </label>
        <label> {errorMessage}</label>
      </div>
    </div>
  );
};

export default Freelance;