import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()

function initializeKeypair(): web3.Keypair {
    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[]
    const secretKey = Uint8Array.from(secret)
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey)
    return keypairFromSecretKey
}

function initializeReceiverKeypair(): web3.PublicKey {
    const secret = process.env.PRIVATE_KEY_RECEIVER ?? ""
    const pubkey = new web3.PublicKey(secret);
    return pubkey
}

async function pingProgram(connection: web3.Connection, payer: web3.Keypair) {
    const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
    const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PROGRAM_ADDRESS);
    const programDataKey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

    const instruction = new web3.TransactionInstruction({
        keys: [
            {
                pubkey: programDataKey,
                isSigner: false,
                isWritable: true
            }
        ],
        programId
    })

    transaction.add(instruction);

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )
    console.log(signature)
}

async function challengeTransfer(connection: web3.Connection, payer: web3.Keypair, receiver: web3.PublicKey) {
    const PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
    const PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

    const transaction = new web3.Transaction();

    const programId = new web3.PublicKey(PROGRAM_ADDRESS);
    const programDataKey = new web3.PublicKey(PROGRAM_DATA_ADDRESS);

    const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: receiver,
        lamports: web3.LAMPORTS_PER_SOL * 0.5
    })
    
    transaction.add(sendSolInstruction)

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    )
    console.log(signature)
}

async function main() {
    const payer = initializeKeypair()
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    //await connection.requestAirdrop(payer.publicKey, web3.LAMPORTS_PER_SOL*1);
    await pingProgram(connection, payer);
    const receiver = initializeReceiverKeypair()
    console.log("Payer: ", payer.publicKey)
    console.log("Receiver: ", receiver)
    challengeTransfer(connection, payer, receiver)
}

main().then(() => {
    console.log("Finished successfully")
}).catch((error) => {
    console.error(error)
})
