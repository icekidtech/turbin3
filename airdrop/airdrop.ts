import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
import { AnchorProvider } from "@coral-xyz/anchor";

// Importing keypair from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creating a new connection to the Solana devnet for SOL tokens
const connection = new Connection("https://api.devnet.solana.com");

async () => {
    try {
        // Claiming 2 devnet SOL tokens
        const txhash = await connection.requestAirdrop(keypair.publicKey, 2 * LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
};

// Importing keypair from wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Creating a new connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("<icekidtech>", "utf8");

// Creating an anchor project
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment: "confirmed"});

// Creating the program
const program : Program<Turbin3Prereq> = new Program(IDL, provider);

// Creating the PDA for my enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddress(enrollment_seeds, program.programId);

// Executing my enrollment tracsaction
async () => {
    const tshash = await program.methods.complete(github).accounts({
        signer: keypair.publicKey,
    })
    .signers([keypair]).rpc();
    console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
} catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
};