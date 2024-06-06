"use strict";
exports.__esModule = true;
exports.TokenSaleAccountLayout = void 0;
//@ts-expect-error missing types
var BufferLayout = require("buffer-layout");
exports.TokenSaleAccountLayout = BufferLayout.struct([
    BufferLayout.u8("isInitialized"),
    BufferLayout.blob(32, "sellerPubkey"),
    BufferLayout.blob(32, "tempTokenAccountPubkey"),
    BufferLayout.blob(8, "pricePerToken"),
    BufferLayout.blob(8, "maxTokenPrice"),
    BufferLayout.blob(8, "increaseTokenPrice"),
    BufferLayout.blob(8, "pucharsedTokenAmount"),
    BufferLayout.blob(8, "phaseStartTime"),
    BufferLayout.blob(8, "phaseDelayTime"),
]);
//# sourceMappingURL=account.js.map