Sample NFT Contract Deployed on Rinkeby Testnet at address: 0x0516fcf4C42e8e89f10F4eD2b0305c59c2330b8D

I didn't go through the process of displaying the images/videos, just printed the links.

The sample contract is for the Lindsey Price Drop, the other contract will be nearly identical (other than potentially adding in auction functionality, but that shouldn't affect this sprint)

I still don't have access to all the completed/finalized artwork, so only 2/7 NFT's have actual metadata on IPFS.


**
The current flow (given such a low number of nft's per collection):**
1. Deploy Contract 
    - This will mint all NFT's in collection to owner's (or artist's) wallet
2. User Purchases NFT   
    - Calls purchase(uint256 id) on the NFT contract
    -  purchase() will ensure the required amount of ETH is included with the transaction, ensure the NFT is still owned by the artist/creator; if those conditions are met it will then transfer the ETH to a specified address and transfer the NFT to the user wallet.



To Run:

1. npm install
2. npm start
