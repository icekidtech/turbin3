import bs58 from 'bs58';
import prompt from 'prompt-sync';
import { Connection, Keypair, PublicKey } from "@solana/web3.js"
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor"
import { IDL, Turbin3Prereq } from "../program/Turbin3-prereq";
import wallet from "./Turbin3-wallet.json"

function base58_to_wallet() {
    console.log("Enter your name:");
    const promtSync = prompt();
    const name = promtSync("Enter your name: ");
    console.log(`Hello, ${name}!`);

    const base58String = "ALX391xQYvL2ShYvAE5eLkCssFrWxLaffaiqiTcVciWS";
    const wallet = bs58.decode(base58String);
    console.log(wallet);
}
base58_to_wallet();

function wallet_to_base58() {
    const wallet: Buffer = Buffer.from([95,48,49,199,150,41,87,3,102,52,160,183,70,58,201,111,87,58,82,162,176,167,25,17,30,51,10,9,249,127,245,150,138,185,46,53,97,33,27,83,121,153,173,29,228,244,155,220,206,171,4,166,127,168,111,51,153,122,166,97,246,227,214,135]);

    const base58 = bs58.encode(wallet);

    console.log("{:?}", base58);
}
wallet_to_base58();

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
// HvNRQPMWh5f2SfV5nXXFPTsSGu9gtezbdXFBYBKscbGX

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("<https://github.com/icekidtech>", "utf8");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {commitment: "confirmed"});

// Create our program
const program : Program<Turbin3Prereq> = new Program(IDL, provider);

// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] =PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);

// Execute our enrollment transaction
async () => {
    try {
        const txhash = await program.methods.complete(github).accounts({
            signer: keypair.publicKey,
        })
        .signers([
            keypair,
        ]).rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}`);
    } catch (e) {
        console.error(`Oops, something went wrong! ${e}`);
    }
};

