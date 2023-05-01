import { ethers } from "hardhat";
import { CoinFlip__factory } from "../typechain-types";
import { BigNumber } from "ethers";
require("dotenv").config();

const COINFLIP_CONTRACT_ADDRESS = "0xEc8B07414889A0b3Bd3E73ce2d9084463fA8F445"
const FACTOR = "57896044618658097711785492504343953926634992332820282019728792003956564819968"

async function main() {

    // const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);

                // 1. CONNECT ALL TEAM 4 TEST WALLETS
    // instantiate wallet for Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY;
    if(!Joshua_Pk || Joshua_Pk.length <= 0) throw new Error("Missing environment: private key for Joshua");
    const walletJoshua = new ethers.Wallet(Joshua_Pk);
    console.log(`Connected to Joshua's wallet address: ${walletJoshua.address}`);
                    
                // 2. CREATE SIGNERS FROM WALLET
    const signerJoshua = walletJoshua.connect(provider);

                // 3. ATTACH CONTRACT
    // Joshua attaches to the contract and instantiates it
    const coinflipContractFactory = new CoinFlip__factory(signerJoshua);
    console.log("Attaching to contract ...");
    const coinflipContract = coinflipContractFactory.attach(COINFLIP_CONTRACT_ADDRESS);
    console.log(`Attached to CoinFlip contract at ${coinflipContract.address}`);
    // console.log(coinflipContract)
    const wins = await coinflipContract.consecutiveWins()
    console.log(`number of wins are: ${wins}`)
                // 4. call the COINFLIP
    // figure out if T or F will win
    const blockNumber = await provider.getBlockNumber() - 1
    console.log(`block number is: ${blockNumber}`)
    const block = await provider.getBlock(blockNumber)
    console.log(`block is: ${block}`)
    const hash = block.hash
    console.log(`hash is: ${hash}`)
    // hash to string
    const hashString = hash.toString()
    console.log(`hash string is: ${hashString}`)
    // hash to int
    const hashInt = parseInt(hashString)
    console.log(`integer hash is: ${hashInt}`)
    // calc what answer should be
    const coinFlip = hashInt / parseInt(FACTOR)
    console.log(`coin flip is: ${coinFlip}`)
    // remove decimals
    const rounded = Math.trunc(coinFlip)
    console.log(`rounded number is: ${rounded}`)
    // set choice
    const choice = coinFlip == 1 ? true : false
    console.log(`choice is: ${choice}`)
    // execute flip of coin
    console.log(`flipping a coin`)
    const flipTx = await coinflipContract.connect(signerJoshua).flip(choice)
    const receipt = await flipTx.wait()
    console.log(receipt)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
