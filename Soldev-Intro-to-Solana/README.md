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



