"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
// Generating a new keypair
let kp = web3_js_1.Keypair.generate();
console.log(`You've generated a new Solana Wallet`, kp.publicKey.toBase58());
console.log(`[${kp.secretKey}]`);
