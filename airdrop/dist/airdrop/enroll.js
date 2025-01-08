"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bs58_1 = __importDefault(require("bs58"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const Turbin3_prereq_1 = require("../programs/Turbin3-prereq");
const Turbin3_wallet_json_1 = __importDefault(require("./Turbin3-wallet.json"));
function base58_to_wallet() {
    console.log("Enter your name:");
    const promtSync = (0, prompt_sync_1.default)();
    const name = promtSync("Enter your name: ");
    console.log(`Hello, ${name}!`);
    const base58String = "ALX391xQYvL2ShYvAE5eLkCssFrWxLaffaiqiTcVciWS";
    const wallet = bs58_1.default.decode(base58String);
    console.log(wallet);
}
base58_to_wallet();
function wallet_to_base58() {
    const wallet = Buffer.from([95, 48, 49, 199, 150, 41, 87, 3, 102, 52, 160, 183, 70, 58, 201, 111, 87, 58, 82, 162, 176, 167, 25, 17, 30, 51, 10, 9, 249, 127, 245, 150, 138, 185, 46, 53, 97, 33, 27, 83, 121, 153, 173, 29, 228, 244, 155, 220, 206, 171, 4, 166, 127, 168, 111, 51, 153, 122, 166, 97, 246, 227, 214, 135]);
    const base58 = bs58_1.default.encode(wallet);
    console.log("{:?}", base58);
}
wallet_to_base58();
// We're going to import our keypair from the wallet file
const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Turbin3_wallet_json_1.default));
// HvNRQPMWh5f2SfV5nXXFPTsSGu9gtezbdXFBYBKscbGX
// Create a devnet connection
const connection = new web3_js_1.Connection("https://api.devnet.solana.com");
// Github account
const github = Buffer.from("<https://github.com/icekidtech>", "utf8");
// Create our anchor provider
const provider = new anchor_1.AnchorProvider(connection, new anchor_1.Wallet(keypair), { commitment: "confirmed" });
// Create our program
const program = new anchor_1.Program(Turbin3_prereq_1.IDL, provider);
// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = web3_js_1.PublicKey.findProgramAddressSync(enrollment_seeds, program.programId);
// Execute our enrollment transaction
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txhash = yield program.methods.complete(github).accounts({
            signer: keypair.publicKey,
        })
            .signers([
            keypair,
        ]).rpc();
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}`);
    }
    catch (e) {
        console.error(`Oops, something went wrong! ${e}`);
    }
});
