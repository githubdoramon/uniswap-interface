"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePoolAddress = void 0;
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
const ethers_1 = require("ethers");
const zksync_web3_1 = require("zksync-web3");
const UniswapV3Pool_json_1 = require("../abis/UniswapV3Pool.json");
const POOL_BYTECODE_HASH = ethers_1.utils.hexlify(zksync_web3_1.utils.hashBytecode(UniswapV3Pool_json_1.bytecode));
function computePoolAddress(factoryAddress, [tokenA, tokenB], fee) {
    const [token0, token1] = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA];
    const constructorArgumentsEncoded = ethers_1.utils.defaultAbiCoder.encode(['address', 'address', 'uint24'], [token0, token1, fee]);
    return zksync_web3_1.utils.create2Address(factoryAddress, POOL_BYTECODE_HASH, ethers_1.utils.keccak256(constructorArgumentsEncoded), '0x');
}
exports.computePoolAddress = computePoolAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemtzeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvemtzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUFvRTtBQUNwRSxtQ0FBOEI7QUFDOUIsNkNBQThDO0FBRTlDLG1FQUFxRDtBQUVyRCxNQUFNLGtCQUFrQixHQUFHLGNBQUssQ0FBQyxPQUFPLENBQUMsbUJBQU8sQ0FBQyxZQUFZLENBQUMsNkJBQVEsQ0FBQyxDQUFDLENBQUE7QUFFeEUsU0FBZ0Isa0JBQWtCLENBQUMsY0FBc0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQW1CLEVBQUUsR0FBVztJQUN4RyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMxRyxNQUFNLDJCQUEyQixHQUFHLGNBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUM5RCxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLEVBQ2hDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FDdEIsQ0FBQTtJQUNELE9BQU8sbUJBQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLGNBQUssQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUN2SCxDQUFDO0FBUEQsZ0RBT0MifQ==