import { useEffect, useState } from "react";
import {
    loadContract,
    connectWallet,
    getCurrentWalletConnected,
    buyNFT,
} from "./util/interact.js";


const Example = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);
    loadNFTInfo();

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const loadNFTInfo = async() => {
      const nft = await loadContract();
      let total = await nft.methods.TOTAL_SUPPLY().call()
      let data = []
      for (let i=0; i < total; i++) {
          let metadata = await nft.methods.tokenURI(i).call();
          metadata = metadata.replace("ipfs://", "https://ipfs.io/ipfs/");
          const response = await fetch(metadata);
          const json = await response.json();
          data.push(json);
      }
      console.log(data);
      document.getElementById("n1").innerHTML = "Name: " + data[0]["name"];
      document.getElementById("d1").innerHTML = "Description: " + data[0]["description"];
      document.getElementById("b1").innerHTML = "Brief: " + data[0]["series_brief"];
      document.getElementById("i1").innerHTML = "Image: " + data[0]["image"];
      document.getElementById("a1").innerHTML = "Animation: "+ data[0]["animation_url"];
      document.getElementById("n2").innerHTML = "Name: " + data[1]["name"];
      document.getElementById("d2").innerHTML = "Description: " + data[1]["description"];
      document.getElementById("b2").innerHTML = "Brief: " + data[1]["series_brief"];
      document.getElementById("i2").innerHTML = "Image: " + data[1]["image"];
      document.getElementById("a2").innerHTML = "Animation: "+ data[1]["animation_url"];
  }

  const onPurchase = async(id) => {
      console.log("Purchase Clicked")
     const { success, status } = await buyNFT(id);
  };


  return (
      <div>
          <div className="Minter">
              <button id="walletButton" onClick={connectWalletPressed}>
                  {walletAddress.length > 0 ? (
                      "Connected: " +
                      String(walletAddress).substring(0, 6) +
                      "..." +
                      String(walletAddress).substring(38)
                  ) : (
                      <span>Connect Wallet</span>
                  )}
              </button>
          </div>
          <div className="grid-container">
              <div className="grid-item">
                  <p id='n1'>Name: </p>
                  <p id='d1'>Description: </p>
                  <p id='b1'>Brief: </p>
                  <p id='i1'>Image: </p>
                  <p id='a1'>Animation: </p>
              </div>
              <button id="mintButton" onClick={() => onPurchase(0)}>Purchase</button>
              <div className="grid-item">
                  <p id='n2'>Name:  {data}</p>
                  <p id='d2'>Description: </p>
                  <p id='b2'>Brief: </p>
                  <p id='i2'>Image: </p>
                  <p id='a2'>Animation: </p>
              </div>
              <button id="mintButton" onClick={() => onPurchase(1)}>Purchase</button>
          </div>
      </div>
  );
};

export default Example;
