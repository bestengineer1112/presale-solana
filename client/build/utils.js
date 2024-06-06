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
exports.checkAccountDataIsValid = exports.checkAccountInitialized = exports.createAccountInfo = exports.getTokenBalance = exports.getKeypair = exports.updateEnv = void 0;
var web3_js_1 = require("@solana/web3.js");
var BN = require("bn.js");
var fs = require("fs");
var envItems = [
    "CUSTOM_PROGRAM_ID",
    "SELLER_PUBLIC_KEY",
    "SELLER_PRIVATE_KEY",
    "BUYER_PUBLIC_KEY",
    "BUYER_PRIVATE_KEY",
    "TOKEN_PUBKEY",
    "SELLER_TOKEN_ACCOUNT_PUBKEY",
    "TEMP_TOKEN_ACCOUNT_PUBKEY",
    "TOKEN_SALE_PROGRAM_ACCOUNT_PUBKEY",
];
function updateEnv() {
    var eol = "\n";
    var envContents = envItems
        .map(function (item) { return "".concat(item, "=").concat(process.env[item]); })
        .join(eol);
    fs.writeFileSync(".env", envContents);
}
exports.updateEnv = updateEnv;
var getKeypair = function (publicKey, privateKey) {
    return new web3_js_1.Keypair({
        publicKey: new web3_js_1.PublicKey(publicKey).toBytes(),
        secretKey: privateKey
    });
};
exports.getKeypair = getKeypair;
var getTokenBalance = function (pubkey, connection) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = parseInt;
                return [4 /*yield*/, connection.getTokenAccountBalance(pubkey)];
            case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).value.amount])];
        }
    });
}); };
exports.getTokenBalance = getTokenBalance;
var createAccountInfo = function (pubkey, isSigner, isWritable) {
    return {
        pubkey: pubkey,
        isSigner: isSigner,
        isWritable: isWritable
    };
};
exports.createAccountInfo = createAccountInfo;
var checkAccountInitialized = function (connection, customAccountPubkey) { return __awaiter(void 0, void 0, void 0, function () {
    var customAccount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connection.getAccountInfo(customAccountPubkey)];
            case 1:
                customAccount = _a.sent();
                console.log(customAccount, "customAccount");
                if (customAccount === null || customAccount.data.length === 0) {
                    console.error("Account of custom program has not been initialized properly");
                    process.exit(1);
                }
                return [2 /*return*/, customAccount];
        }
    });
}); };
exports.checkAccountInitialized = checkAccountInitialized;
var checkAccountDataIsValid = function (customAccountData, expectedCustomAccountState) {
    var keysOfAccountData = Object.keys(customAccountData);
    var data = {};
    keysOfAccountData.forEach(function (key) {
        if (key !== "phaseStartTime") {
            var value = customAccountData[key];
            var expectedValue = expectedCustomAccountState[key];
            if (value instanceof Uint8Array && expectedValue instanceof web3_js_1.PublicKey) {
                if (!new web3_js_1.PublicKey(value).equals(expectedValue)) {
                    console.log("".concat(key, " is not matched expected one"));
                    process.exit(1);
                }
            }
            else if (value instanceof Uint8Array &&
                typeof expectedValue === "number") {
                if (!value) {
                    console.log("".concat(key, " flag has not been set"));
                    process.exit(1);
                }
                var isBufferSame = Buffer.compare(value, Buffer.from(new BN(expectedValue).toArray("le", value.length)));
                if (isBufferSame !== 0) {
                    console.log("[".concat(key, "] : expected value is ").concat(expectedValue, ", but current value is ").concat(value));
                    process.exit(1);
                }
            }
            data[key] = expectedValue.toString();
        }
    });
    console.table([data]);
};
exports.checkAccountDataIsValid = checkAccountDataIsValid;
//# sourceMappingURL=utils.js.map