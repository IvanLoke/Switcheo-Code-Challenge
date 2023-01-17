const { ethers } = require("ethers");
const abi = require("./abi.json");

const walletAddress:string[] = ['0xb5d4f343412dc8efb6ff599d790074d0f1e8d430', //addresses of wallets in an array
'0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
'0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392'];
const bscProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/"); //provider for contract
const tokenContractAddress:string = '0xC0ECB8499D8dA2771aBCbF4091DB7f65158f1468'; // token address
const contract = new ethers.Contract('0xC0ECB8499D8dA2771aBCbF4091DB7f65158f1468',abi, bscProvider);
const main = async()=>{
    walletAddress.forEach((address)=>{ //looping through each wallet address
        contract.balanceOf(address).then((balance:any)=>{ //getting balance for each wallet
            const formattedBalance = ethers.utils.formatUnits(balance,8); //formatting it into numbers
            console.log(address,formattedBalance);
        })
});


}

main();