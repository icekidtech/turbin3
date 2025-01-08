import { Transaction, SystemProgram, Connection, Keypair, LAMPORTS_PER_SOL, sendAndConfirmRawTransaction, PublicKey } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
import { serialize } from "v8";

// Importing dev wallet Keypair from wallet file
const from = Keypair.fromSecretKey(new Uint8Array(wallet));

// My Turbin3 Pblic Key
const to = new PublicKey("GbBAk1zu58UEtmGBXKXZc8YX2WWdkUMboWDLrygVbN7p");

// Creating Solana devnet connection
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Creating a new transaction
async () => {
    try {
        const transaction = new Transaction().add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL/100,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        // Sign the transaction
        transaction.sign(from);

        // Serialize the transaction
        const serializedTransaction = transaction.serialize();

        // Sign transaction, broadcast, and confirm
        const signature = await sendAndConfirmRawTransaction(
            connection,
            serializedTransaction
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
};

// Call the function
async () => {
    try {
        // Get dev wallet balance
        const balance = await connection.getBalance(from.publicKey);

        // Create a test transaction to calculate fees
        const transaction = new Transaction().add(SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance,
            })
        );
        transaction.recentBlockhash = (await connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;

        // Calculating the exact fee rate to transfer entire SOL balance
        const fee = (await connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;

        // Remove the transfer instruction and add a new one with the exact fee rate
        transaction.instructions = [];
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: from.publicKey,
                toPubkey: to,
                lamports: balance - fee,
            })
        );
        // Sign the transaction, broadcast and confirm
        const serializedTransaction = transaction.serialize();
        const signature = await sendAndConfirmRawTransaction(
            connection,
            serializedTransaction,
        );
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
};