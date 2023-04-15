import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}

console.log("test");
getBalanceUsingWeb3(CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN);