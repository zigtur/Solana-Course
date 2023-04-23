# Intro to Solana
https://www.soldev.app/course

## Module 1 - Client Interaction with the Solana Network
### Read Data From The Solana Network


Some code examples:

```js
async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
    const connection = new Connection(clusterApiUrl('devnet'));
    return connection.getBalance(address);
}
```

### Write Data To The Solana Network
Look at `Module1/solana-ping-client` directory.


### Interact with wallets
Not studied


### Serialize custom instruction data



## Module 2 - Client Interaction with Common Solana Programs
### Create tokens with the Token Program


### Swap tokens with the Token Swap Program


### Create Solana NFTs with Metaplex



## Module 3 - Basic Solana Program Development
### Hello World


### Create a Basic Program, Part 1 - Handle Instruction Data

### Create a Basic Program, Part 2 - State Management


### Create a Basic Program, Part 3 - Basic Security and Validation



