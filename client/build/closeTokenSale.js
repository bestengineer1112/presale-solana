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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var dotenv = require("dotenv");
dotenv.config();
var web3_js_1 = require("@solana/web3.js");
var utils_1 = require("./utils");
var spl_token_1 = require("@solana/spl-token");
var account_1 = require("./account");
var bs58 = require("bs58");
var transaction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, tokenSaleProgramId, sellerPubkey, sellerPrivateKey, sellerKeypair, buyerPubkey, buyerPrivateKey, buyerKeypair, tokenPubkey, tokenSaleProgramAccountPubkey, sellerTokenAccountPubkey, instruction, tokenSaleProgramAccount, encodedTokenSaleProgramAccountData, decodedTokenSaleProgramAccountData, tokenSaleProgramAccountData, token, buyerTokenAccount, PDA, closeTokenSaleIx, tx, sellerTokenAccountBalance, buyerTokenAccountBalance, sellerSOLBalance, buyerSOLBalance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("5. Close Token Sale");
                //phase1 (setup Transaction & send Transaction)
                console.log("Setup Transaction");
                connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
                tokenSaleProgramId = new web3_js_1.PublicKey(process.env.CUSTOM_PROGRAM_ID);
                sellerPubkey = new web3_js_1.PublicKey(process.env.SELLER_PUBLIC_KEY);
                sellerPrivateKey = Uint8Array.from(bs58.decode(process.env.SELLER_PRIVATE_KEY));
                sellerKeypair = new web3_js_1.Keypair({
                    publicKey: sellerPubkey.toBytes(),
                    secretKey: sellerPrivateKey
                });
                buyerPubkey = new web3_js_1.PublicKey(process.env.BUYER_PUBLIC_KEY);
                buyerPrivateKey = Uint8Array.from(bs58.decode(process.env.BUYER_PRIVATE_KEY));
                buyerKeypair = new web3_js_1.Keypair({
                    publicKey: buyerPubkey.toBytes(),
                    secretKey: buyerPrivateKey
                });
                tokenPubkey = new web3_js_1.PublicKey(process.env.TOKEN_PUBKEY);
                tokenSaleProgramAccountPubkey = new web3_js_1.PublicKey(process.env.TOKEN_SALE_PROGRAM_ACCOUNT_PUBKEY);
                sellerTokenAccountPubkey = new web3_js_1.PublicKey(process.env.SELLER_TOKEN_ACCOUNT_PUBKEY);
                instruction = 3;
                return [4 /*yield*/, (0, utils_1.checkAccountInitialized)(connection, tokenSaleProgramAccountPubkey)];
            case 1:
                tokenSaleProgramAccount = _a.sent();
                encodedTokenSaleProgramAccountData = tokenSaleProgramAccount.data;
                decodedTokenSaleProgramAccountData = account_1.TokenSaleAccountLayout.decode(encodedTokenSaleProgramAccountData);
                tokenSaleProgramAccountData = {
                    isInitialized: decodedTokenSaleProgramAccountData.isInitialized,
                    sellerPubkey: new web3_js_1.PublicKey(decodedTokenSaleProgramAccountData.sellerPubkey),
                    tempTokenAccountPubkey: new web3_js_1.PublicKey(decodedTokenSaleProgramAccountData.tempTokenAccountPubkey),
                    swapSolAmount: decodedTokenSaleProgramAccountData.swapSolAmount,
                    swapTokenAmount: decodedTokenSaleProgramAccountData.swapTokenAmount
                };
                token = new spl_token_1.Token(connection, tokenPubkey, spl_token_1.TOKEN_PROGRAM_ID, buyerKeypair);
                return [4 /*yield*/, token.getOrCreateAssociatedAccountInfo(buyerKeypair.publicKey)];
            case 2:
                buyerTokenAccount = _a.sent();
                return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from("token_sale")], tokenSaleProgramId)];
            case 3:
                PDA = _a.sent();
                closeTokenSaleIx = new web3_js_1.TransactionInstruction({
                    programId: tokenSaleProgramId,
                    keys: [
                        (0, utils_1.createAccountInfo)(sellerPubkey, true, true),
                        (0, utils_1.createAccountInfo)(sellerTokenAccountPubkey, false, true),
                        (0, utils_1.createAccountInfo)(tokenSaleProgramAccountData.tempTokenAccountPubkey, false, true),
                        (0, utils_1.createAccountInfo)(spl_token_1.TOKEN_PROGRAM_ID, false, false),
                        (0, utils_1.createAccountInfo)(PDA[0], false, false),
                        (0, utils_1.createAccountInfo)(tokenSaleProgramAccountPubkey, false, true),
                    ],
                    data: Buffer.from(Uint8Array.of(instruction))
                });
                tx = new web3_js_1.Transaction().add(closeTokenSaleIx);
                return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [sellerKeypair])];
            case 4:
                _a.sent();
                return [4 /*yield*/, connection.getTokenAccountBalance(sellerTokenAccountPubkey)];
            case 5:
                sellerTokenAccountBalance = _a.sent();
                return [4 /*yield*/, connection.getTokenAccountBalance(buyerTokenAccount.address)];
            case 6:
                buyerTokenAccountBalance = _a.sent();
                console.table([
                    {
                        sellerTokenAccountBalance: sellerTokenAccountBalance.value.amount.toString(),
                        buyerTokenAccountBalance: buyerTokenAccountBalance.value.amount.toString()
                    },
                ]);
                return [4 /*yield*/, connection.getBalance(sellerPubkey, "confirmed")];
            case 7:
                sellerSOLBalance = _a.sent();
                return [4 /*yield*/, connection.getBalance(buyerPubkey, "confirmed")];
            case 8:
                buyerSOLBalance = _a.sent();
                console.table([
                    {
                        sellerSOLBalance: sellerSOLBalance / web3_js_1.LAMPORTS_PER_SOL,
                        buyerSOLBalance: buyerSOLBalance / web3_js_1.LAMPORTS_PER_SOL
                    },
                ]);
                console.log("\u2728TX successfully finished\u2728\n");
                return [2 /*return*/];
        }
    });
}); };
transaction();
//# sourceMappingURL=closeTokenSale.js.map