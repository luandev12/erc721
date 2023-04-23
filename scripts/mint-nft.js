require('dotenv').config();
const ethers = require('ethers');

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Get Alchemy API Key
// Get the NFT Metadata IPFS URL
// Get contract ABI and address
const API_KEY = process.env.API_KEY;
const privateKey = process.env.PRIVATE_KEY
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmQnqdrzphsiiLAsUggH499YNv7ueXFChHAjQU9yWT2uf5"
const contractAddress = '0x2CCc4C9d2828b409553a9ff2Df015Ea483BDd3Ed'

// Define an Alchemy Provider
// Create a signer
// Create a contract instance
const provider = new ethers.AlchemyProvider('sepolia', API_KEY);
const signer = new ethers.Wallet(privateKey, provider)
const myNftContract = new ethers.Contract(contractAddress, contract.abi, signer)


// Call mintNFT function
const mintNFT = async() => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });