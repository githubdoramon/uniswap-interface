"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticV2SubgraphProvider = void 0;
const v2_sdk_1 = require("@uniswap/v2-sdk");
const lodash_1 = __importDefault(require("lodash"));
const chains_1 = require("../../util/chains");
const log_1 = require("../../util/log");
const token_provider_1 = require("../token-provider");
const BASES_TO_CHECK_TRADES_AGAINST = {
    [chains_1.ChainId.MAINNET]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[chains_1.ChainId.MAINNET],
        token_provider_1.DAI_MAINNET,
        token_provider_1.USDC_MAINNET,
        token_provider_1.USDT_MAINNET,
        token_provider_1.WBTC_MAINNET,
    ],
    [chains_1.ChainId.ROPSTEN]: [chains_1.WRAPPED_NATIVE_CURRENCY[chains_1.ChainId.ROPSTEN]],
    [chains_1.ChainId.RINKEBY]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[chains_1.ChainId.RINKEBY],
        token_provider_1.DAI_RINKEBY_1,
        token_provider_1.DAI_RINKEBY_2,
    ],
    [chains_1.ChainId.GÖRLI]: [chains_1.WRAPPED_NATIVE_CURRENCY[chains_1.ChainId.GÖRLI]],
    [chains_1.ChainId.KOVAN]: [chains_1.WRAPPED_NATIVE_CURRENCY[chains_1.ChainId.KOVAN]],
    //v2 not deployed on [optimism, arbitrum, polygon, celo, gnosis, moonbeam] and their testnets
    [chains_1.ChainId.OPTIMISM]: [],
    [chains_1.ChainId.ARBITRUM_ONE]: [],
    [chains_1.ChainId.ARBITRUM_RINKEBY]: [],
    [chains_1.ChainId.ARBITRUM_GOERLI]: [],
    [chains_1.ChainId.OPTIMISM_GOERLI]: [],
    [chains_1.ChainId.OPTIMISTIC_KOVAN]: [],
    [chains_1.ChainId.POLYGON]: [],
    [chains_1.ChainId.POLYGON_MUMBAI]: [],
    [chains_1.ChainId.CELO]: [],
    [chains_1.ChainId.CELO_ALFAJORES]: [],
    [chains_1.ChainId.GNOSIS]: [],
    [chains_1.ChainId.MOONBEAM]: [],
    [chains_1.ChainId.BSC]: [],
    [chains_1.ChainId.ZKSYNC_ERA]: [],
    [chains_1.ChainId.ZKSYNC_ERA_TESTNET]: [],
};
/**
 * Provider that does not get data from an external source and instead returns
 * a hardcoded list of Subgraph pools.
 *
 * Since the pools are hardcoded, the liquidity/price values are dummys and should not
 * be depended on.
 *
 * Useful for instances where other data sources are unavailable. E.g. subgraph not available.
 *
 * @export
 * @class StaticV2SubgraphProvider
 */
class StaticV2SubgraphProvider {
    constructor(chainId) {
        this.chainId = chainId;
    }
    async getPools(tokenIn, tokenOut) {
        log_1.log.info('In static subgraph provider for V2');
        const bases = BASES_TO_CHECK_TRADES_AGAINST[this.chainId];
        const basePairs = lodash_1.default.flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]));
        if (tokenIn && tokenOut) {
            basePairs.push([tokenIn, tokenOut], ...bases.map((base) => [tokenIn, base]), ...bases.map((base) => [tokenOut, base]));
        }
        const pairs = (0, lodash_1.default)(basePairs)
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([tokenA, tokenB]) => tokenA.address !== tokenB.address && !tokenA.equals(tokenB))
            .value();
        const poolAddressSet = new Set();
        const subgraphPools = (0, lodash_1.default)(pairs)
            .map(([tokenA, tokenB]) => {
            const poolAddress = v2_sdk_1.Pair.getAddress(tokenA, tokenB);
            if (poolAddressSet.has(poolAddress)) {
                return undefined;
            }
            poolAddressSet.add(poolAddress);
            const [token0, token1] = tokenA.sortsBefore(tokenB)
                ? [tokenA, tokenB]
                : [tokenB, tokenA];
            return {
                id: poolAddress,
                liquidity: '100',
                token0: {
                    id: token0.address,
                },
                token1: {
                    id: token1.address,
                },
                supply: 100,
                reserve: 100,
                reserveUSD: 100,
            };
        })
            .compact()
            .value();
        return subgraphPools;
    }
}
exports.StaticV2SubgraphProvider = StaticV2SubgraphProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXN1YmdyYXBoLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy92Mi9zdGF0aWMtc3ViZ3JhcGgtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNENBQXVDO0FBQ3ZDLG9EQUF1QjtBQUV2Qiw4Q0FBcUU7QUFDckUsd0NBQXFDO0FBQ3JDLHNEQU8yQjtBQVEzQixNQUFNLDZCQUE2QixHQUFtQjtJQUNwRCxDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakIsZ0NBQXVCLENBQUMsZ0JBQU8sQ0FBQyxPQUFPLENBQUU7UUFDekMsNEJBQVc7UUFDWCw2QkFBWTtRQUNaLDZCQUFZO1FBQ1osNkJBQVk7S0FDYjtJQUNELENBQUMsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGdDQUF1QixDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFFLENBQUM7SUFDOUQsQ0FBQyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pCLGdDQUF1QixDQUFDLGdCQUFPLENBQUMsT0FBTyxDQUFFO1FBQ3pDLDhCQUFhO1FBQ2IsOEJBQWE7S0FDZDtJQUNELENBQUMsZ0JBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLGdDQUF1QixDQUFDLGdCQUFPLENBQUMsS0FBSyxDQUFFLENBQUM7SUFDMUQsQ0FBQyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsZ0NBQXVCLENBQUMsZ0JBQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQztJQUMxRCw2RkFBNkY7SUFDN0YsQ0FBQyxnQkFBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7SUFDdEIsQ0FBQyxnQkFBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUU7SUFDMUIsQ0FBQyxnQkFBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRTtJQUM5QixDQUFDLGdCQUFPLENBQUMsZUFBZSxDQUFDLEVBQUUs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