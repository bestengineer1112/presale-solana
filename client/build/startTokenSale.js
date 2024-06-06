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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var dotenv = require("dotenv");
dotenv.config();
var web3_js_1 = require("@solana/web3.js");
var BN = require("bn.js");
var utils_1 = require("./utils");
var account_1 = require("./account");
var spl_token_1 = require("@solana/spl-token");
var bs58 = require("bs58");
var transaction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection, tokenSaleProgramId, sellerPubkey, sellerPrivateKey, sellerKeypair, tokenMintAccountPubkey, sellerTokenAccountPubkey, instruction, amountOfTokenWantToSale, perTokenPrice, maxTokenPrice, increaseTokenPrice, phaseDelayTime, tempTokenAccountKeypair, createTempTokenAccountIx, _a, _b, initTempTokenAccountIx, transferTokenToTempTokenAccountIx, tokenSaleProgramAccountKeypair, createTokenSaleProgramAccountIx, _c, _d, initTokenSaleProgramIx, tokenSaleProgramAccount, encodedTokenSaleProgramAccountData, decodedTokenSaleProgramAccountData, expectedTokenSaleProgramAccountData;
    var _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                console.log("2. Start Token Sale");
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
                tokenMintAccountPubkey = new web3_js_1.PublicKey(process.env.TOKEN_PUBKEY);
                sellerTokenAccountPubkey = new web3_js_1.PublicKey(process.env.SELLER_TOKEN_ACCOUNT_PUBKEY);
                console.log("sellerTokenAccountPubkey: ", sellerTokenAccountPubkey.toBase58());
                instruction = 0;
                amountOfTokenWantToSale = 1000;
                perTokenPrice = 0.0075 * web3_js_1.LAMPORTS_PER_SOL;
                maxTokenPrice = 0.01 * web3_js_1.LAMPORTS_PER_SOL;
                increaseTokenPrice = 0.0005 * web3_js_1.LAMPORTS_PER_SOL;
                phaseDelayTime = 3600 * 24 * 21;
                tempTokenAccountKeypair = new web3_js_1.Keypair();
                _b = (_a = web3_js_1.SystemProgram).createAccount;
                _e = {
                    fromPubkey: sellerKeypair.publicKey,
                    newAccountPubkey: tempTokenAccountKeypair.publicKey
                };
                return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(spl_token_1.AccountLayout.span)];
            case 1:
                createTempTokenAccountIx = _b.apply(_a, [(_e.lamports = _g.sent(),
                        _e.space = spl_token_1.AccountLayout.span,
                        _e.programId = spl_token_1.TOKEN_PROGRAM_ID,
                        _e)]);
                initTempTokenAccountIx = spl_token_1.Token.createInitAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, tokenMintAccountPubkey, tempTokenAccountKeypair.publicKey, sellerKeypair.publicKey);
                transferTokenToTempTokenAccountIx = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, sellerTokenAccountPubkey, tempTokenAccountKeypair.publicKey, sellerKeypair.publicKey, [], amountOfTokenWantToSale);
                tokenSaleProgramAccountKeypair = new web3_js_1.Keypair();
                _d = (_c = web3_js_1.SystemProgram).createAccount;
                _f = {
                    fromPubkey: sellerKeypair.publicKey,
                    newAccountPubkey: tokenSaleProgramAccountKeypair.publicKey
                };
                return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(account_1.TokenSaleAccountLayout.span)];
            case 2:
                createTokenSaleProgramAccountIx = _d.apply(_c, [(_f.lamports = _g.sent(),
                        _f.space = account_1.TokenSaleAccountLayout.span,
                        _f.programId = tokenSaleProgramId,
                        _f)]);
                console.log("tokenSaleProgramId", tokenSaleProgramId.toBase58());
                initTokenSaleProgramIx = new web3_js_1.TransactionInstruction({
                    programId: tokenSaleProgramId,
                    keys: [
                        (0, utils_1.createAccountInfo)(sellerKeypair.publicKey, true, false),
                        (0, utils_1.createAccountInfo)(tempTokenAccountKeypair.publicKey, false, true),
                        (0, utils_1.createAccountInfo)(tokenSaleProgramAccountKeypair.publicKey, false, true),
                        (0, utils_1.createAccountInfo)(web3_js_1.SYSVAR_RENT_PUBKEY, false, false),
                        (0, utils_1.createAccountInfo)(spl_token_1.TOKEN_PROGRAM_ID, false, false),
                    ],
                    data: Buffer.from(Uint8Array.of.apply(Uint8Array, __spreadArray(__spreadArray(__spreadArray(__spreadArray([instruction], new BN(perTokenPrice).toArray("le", 8), false), new BN(maxTokenPrice).toArray("le", 8), false), new BN(increaseTokenPrice).toArray("le", 8), false), new BN(phaseDelayTime).toArray("le", 8), false)))
                });
                console.log("Send transaction...\n");
                // const tx = new Transaction().add(
                //   createTempTokenAccountIx,
                //   initTempTokenAccountIx,
                //   transferTokenToTempTokenAccountIx,
                //   createTokenSaleProgramAccountIx,
                //   initTokenSaleProgramIx
                // );
                // const signature = await sendAndConfirmTransaction(connection, tx, [sellerKeypair, tempTokenAccountKeypair, tokenSaleProgramAccountKeypair]);
                // console.log("signature: ", signature);
                //phase1 end
                //phase2 (check Transaction result is valid)
                console.log(tokenSaleProgramAccountKeypair.publicKey);
                return [4 /*yield*/, (0, utils_1.checkAccountInitialized)(connection, tokenSaleProgramAccountKeypair.publicKey)];
            case 3:
                tokenSaleProgramAccount = _g.sent();
                console.log(tokenSaleProgramAccount, "Current TokenSaleProgramAccountData");
                encodedTokenSaleProgramAccountData = tokenSaleProgramAccount.data;
                decodedTokenSaleProgramAccountData = account_1.TokenSaleAccountLayout.decode(encodedTokenSaleProgramAccountData);
                expectedTokenSaleProgramAccountData = {
                    isInitialized: 1,
                    sellerPubkey: sellerKeypair.publicKey,
                    tempTokenAccountPubkey: tempTokenAccountKeypair.publicKey,
                    pricePerToken: perTokenPrice,
                    maxTokenPrice: maxTokenPrice,
                    increaseTokenPrice: increaseTokenPrice,
                    pucharsedTokenAmount: 0,
                    phaseStartTime: 0,
                    phaseDelayTime: phaseDelayTime
                };
                console.log("Current TokenSaleProgramAccountData");
                (0, utils_1.checkAccountDataIsValid)(decodedTokenSaleProgramAccountData, expectedTokenSaleProgramAccountData);
                console.table([
                    {
                        tokenSaleProgramAccountPubkey: tokenSaleProgramAccountKeypair.publicKey.toString()
                    },
                ]);
                console.log("\u2728TX successfully finished\u2728\n");
                //#phase2 end
                process.env.TOKEN_SALE_PROGRAM_ACCOUNT_PUBKEY =
                    tokenSaleProgramAccountKeypair.publicKey.toString();
                process.env.TEMP_TOKEN_ACCOUNT_PUBKEY =
                    tempTokenAccountKeypair.publicKey.toString();
                (0, utils_1.updateEnv)();
                return [2 /*return*/];
        }
    });
}); };
transaction();
//# sourceMappingURL=startTokenSale.js.map