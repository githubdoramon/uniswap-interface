// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { utils } from 'ethers'
import { utils as zkUtils } from 'zksync-web3'

import { bytecode } from '../abis/UniswapV3Pool.json'

const POOL_BYTECODE_HASH = utils.hexlify(zkUtils.hashBytecode(bytecode))

export function computePoolAddress(factoryAddress: string, [tokenA, tokenB]: [string, string], fee: number): string {
  const [token0, token1] = tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
  const constructorArgumentsEncoded = utils.defaultAbiCoder.encode(
    ['address', 'address', 'uint24'],
    [token0, token1, fee]
  )
  return zkUtils.create2Address(factoryAddress, POOL_BYTECODE_HASH, utils.keccak256(constructorArgumentsEncoded), '0x')
}

export const PERMIT2_ADDRESS = '0x6fbAE87e7b6f624bF256b05A1eaF2D4D9B53E7ec'
export const UNIVERSAL_ROUTER_ADDRESS = '0xc5FA2d9BaC22A621A5d86CB0BCf22741F940bA9d'
