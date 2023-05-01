# Introduction
Source: https://docs.metaplex.com/programs/understanding-programs

Solana separates **logic** and **data**. This is a big difference compared to other blockchains like EVM-based ones.
**Logic** corresponds to **Programs**, and **data** corresponds to **Accounts**.
So, data are not stored internally. Programs interact with external data stored in accounts with the ability to mutate those data.

*Note: Technically, Programs are Accounts marked as `executable`.*

## Accounts
In Solana, data are stored in **Accounts**. Those are simple arrays of bytes stored at a particular address (which is the *public key* of a crypto keypair).

Access to the *private key* allows signing on behalf of that Account. Depending on the program, the private key may give the ability to mutate the data stored in the Account.

A Program that create an account will usually mark it as its Owner, and define some data structure in the allocated array of bytes. The Program that owns the Account is then responsible for providing Instructions that can be used to interact with it.

### Program Derived Addresses (PDA)
This is a special type of Account. Its address is algorithmically derived from the public key of the Program (that will own the account). 

Since the address is derived from the Program pub key, other Programs can't derive the same address. Additional **seeds** can be provided to the derivation algorithm.

Multiple use-cases for it:
- Sign Cross-Program Invocations
- Creation of other accounts attached to PDA

*Note: The public key attached to PDA is not a real crypto pub key. It is not part of the elliptic curve.*

### Account data
Accounts store data as a serialized array of bytes. The data structure is the responsibility of the Program.


### Discriminators
If a program handles multiple data structure, it needs a discriminator in the account data to know which type are the data stored.

There are multiple ways to do it:
- Use a shared Enum as the first byte of every account: This byte will let the program know which type data are.
- Use a deterministic hash as the first byte of every account: Similar to the one before, but use a hash instead of an Enum. The Anchor framework create programs that use this approach.
- No discriminator, use the size of the account: to know the size of the structure, and so the data type.

### Field types, sizes and offsets
Optional fields can be defined. This means that there exists a scenario where that field is empty. An additional byte as a prefix will indicate whether the field is empty or not.

Indicative fields are fields that are not used by the program. But this type of fields can bring important informations.


## Programs
### Instructions
Interactions with a Program are made using the **Instructions** it provides. Multiple Instructions can be packed into a single Transaction. Each Transaction is atomic (if an instruction fails, the whole transaction reverts).

Similarly to Accounts, Instructions are serialized into an array of bytes before being sent to the network. The data to be serialized must contain the following information for the Program to execute it:
- Discriminator: Instructions are usually prefixed with a discriminator so the Program can identify which Instruction is being executed.
- Accounts: An array of Accounts addresses that are affected by the instruction. Here, affected means read, mutated or both. Note that the order of this array is important, since the Programs will identify the type of Account provided based on his position.
- Arguments: An array of data fields required by the instruction. Not uncommon for it to be empty, as a lot of data are stored in the `Accounts`.
- Signers: An array of signatures for a sub-set of the Accounts provided. This is only needed for Accounts that are required to sign the Instruction.

### Signer and/or Writable Accounts
A Program may require that the Accounts provided within an Instruction are Signers and/or Writable:
- Signers: A Signer Account is required to sign the Transaction for the Instruction to be successful. By attaching a signature, users can prove that they are the owner of the Account.
- Writable: A Writable Account will be mutated by the Instruction. This information is important for the blockchain to know which Transactions can be run in parallel and which ones can't.


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


## Module 5 - Anchor Program Development
### Intro to Anchor development
Anchor is a development framework that makes writing Solana programs easier, faster, and more secure. It's the "go to" framework for Solana development for very good reason. It makes it easier to organize and reason about your code, implements common security checks automatically, and abstracts away a significant amount of boilerplate associated with writing a Solana program.

