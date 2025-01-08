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
const web3_js_1 = require("@solana/web3.js");
const dev_wallet_json_1 = __importDefault(require("./dev-wallet.json"));
// Importing dev wallet Keypair from wallet file
const from = web3_js_1.Keypair.fromSecretKey(new Uint8Array(dev_wallet_json_1.default));
// My Turbin3 Pblic Key
const to = new web3_js_1.PublicKey("GbBAk1zu58UEtmGBXKXZc8YX2WWdkUMboWDLrygVbN7p");
// Creating Solana devnet connection
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
// Creating a new transaction
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: web3_js_1.LAMPORTS_PER_SOL / 100,
        }));
        transaction.recentBlockhash = (yield connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        // Sign the transaction
        transaction.sign(from);
        // Serialize the transaction
        const serializedTransaction = transaction.serialize();
        // Sign transaction, broadcast, and confirm
        const signature = yield (0, web3_js_1.sendAndConfirmRawTransaction)(connection, serializedTransaction);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    }
    catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
});
// Call the function
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get dev wallet balance
        const balance = yield connection.getBalance(from.publicKey);
        // Create a test transaction to calculate fees
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance,
        }));
        transaction.recentBlockhash = (yield connection.getLatestBlockhash('confirmed')).blockhash;
        transaction.feePayer = from.publicKey;
        // Calculating the exact fee rate to transfer entire SOL balance
        const fee = (yield connection.getFeeForMessage(transaction.compileMessage(), 'confirmed')).value || 0;
        // Remove the transfer instruction and add a new one with the exact fee rate
        transaction.instructions = [];
        transaction.add(web3_js_1.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: balance - fee,
        }));
        // Sign the transaction, broadcast and confirm
        const serializedTransaction = transaction.serialize();
        const signature = yield (0, web3_js_1.sendAndConfirmRawTransaction)(connection, serializedTransaction);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    }
    catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
});
