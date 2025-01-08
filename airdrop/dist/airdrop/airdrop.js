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
// Importing keypair from wallet file
const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(dev_wallet_json_1.default));
// Creating a new connection to the Solana devnet for SOL tokens
const connection = new web3_js_1.Connection("https://api.devnet.solana.com");
() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Claiming 2 devnet SOL tokens
        const txhash = yield connection.requestAirdrop(keypair.publicKey, 2 * web3_js_1.LAMPORTS_PER_SOL);
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
    }
    catch (e) {
        console.error(`Oops, something went wrong: ${e}`);
    }
});
