import { ethers } from "hardhat";
import { CoinFlip__factory } from "../typechain-types";
require("dotenv").config();

const COINFLIP_CONTRACT_ADDRESS = "0xEc8B07414889A0b3Bd3E73ce2d9084463fA8F445";

async function main() {

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);

                // 1. CONNECT ALL TEAM 4 TEST WALLETS

    // instantiate wallet for Joshua
    const Joshua_Pk = process.env.PRIVATE_KEY_JOSHUA;
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
    console.log(`Attached to MyToken contract at ${coinflipContract.address}`);

//                 // 4. MINTING TOKENS

//     // Joshua mints tokens
//     console.log(`Minting tokens for Joshua at address: ${walletJoshua.address}`);
//     const mintTxJoshua = await tokenContract.mint(walletJoshua.address, MINT_VALUE);
//     const mintTxReceiptJoshua = await mintTxJoshua.wait();
//     console.log(`Minted tokens for ${signerJoshua.address} at block ${mintTxReceiptJoshua.blockNumber}`);
//     const tokenBalanceAccountJoshua = await tokenContract.balanceOf(walletJoshua.address);
//     console.log(`Address ${signerJoshua.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountJoshua)}\n`);
    
//     // Hardeep mints tokens
//     console.log(`Minting tokens for Hardeep at address: ${walletHardeep.address}`);
//     const mintTxHardeep = await tokenContract.mint(walletHardeep.address, MINT_VALUE);
//     const mintTxReceiptHardeep = await mintTxHardeep.wait();
//     console.log(`Minted tokens for ${walletHardeep.address} at block ${mintTxReceiptHardeep.blockNumber}`);
//     const tokenBalanceAccountHardeep = await tokenContract.balanceOf(walletHardeep.address);
//     console.log(`Address ${signerJoshua.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountHardeep)}\n`);

//     // Chris mints tokens
//     console.log(`Minting tokens for Chris at address: ${walletChris.address}`);
//     const mintTxChris = await tokenContract.mint(walletChris.address, MINT_VALUE);
//     const mintTxReceiptChris = await mintTxChris.wait();
//     console.log(`Minted tokens for ${walletChris.address} at block ${mintTxReceiptChris.blockNumber}`);
//     const tokenBalanceAccountChris = await tokenContract.balanceOf(walletChris.address);
//     console.log(`Address ${walletChris.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountChris)}\n`);

//     // Lindsay mints tokens
//     console.log(`Minting tokens for Lindsay at address: ${walletLindsay.address}`);
//     const mintTxLindsay = await tokenContract.mint(walletLindsay.address, MINT_VALUE);
//     const mintTxReceiptLindsay = await mintTxLindsay.wait();
//     console.log(`Minted tokens for ${walletLindsay.address} at block ${mintTxReceiptLindsay.blockNumber}`);
//     const tokenBalanceAccountLindsay = await tokenContract.balanceOf(walletLindsay.address);
//     console.log(`Address ${walletLindsay.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountLindsay)}\n`);

//     // Owen mints tokens
//     console.log(`Minting tokens for Owen at address: ${walletOwen.address}`);
//     const mintTxOwen = await tokenContract.mint(walletOwen.address, MINT_VALUE);
//     const mintTxReceiptOwen = await mintTxOwen.wait();
//     console.log(`Minted tokens for ${walletOwen.address} at block ${mintTxReceiptOwen.blockNumber}`);
//     const tokenBalanceAccountOwen = await tokenContract.balanceOf(walletOwen.address);
//     console.log(`Address ${walletOwen.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountOwen)}\n`);

//     // Josh mints tokens
//     console.log(`Minting tokens for Josh at address: ${walletJosh.address}`);
//     const mintTxJosh = await tokenContract.mint(walletJosh.address, MINT_VALUE);
//     const mintTxReceiptJosh = await mintTxJosh.wait();
//     console.log(`Minted tokens for ${walletJosh.address} at block ${mintTxReceiptJosh.blockNumber}`);
//     const tokenBalanceAccountJosh = await tokenContract.balanceOf(walletJosh.address);
//     console.log(`Address ${walletJosh.address} has a balance of ${ethers.utils.formatEther(tokenBalanceAccountJosh)}\n`);
// }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
