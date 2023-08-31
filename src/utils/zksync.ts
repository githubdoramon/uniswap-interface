// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { SupportedChainId } from 'constants/chains'
import { utils } from 'ethers'
import { AddressMap } from 'router_module'
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

export const PERMIT2_ADDRESS: AddressMap = {
  [SupportedChainId.ZKSYNC_ERA]: '0x0000000000225e31d15943971f47ad3022f714fa',
  [SupportedChainId.ZKSYNC_ERA_TESTNET]: '0xDeF92Ac5a337D035AaC7A4361f30558c5222fe61',
}

export const UNIVERSAL_ROUTER_ADDRESS: AddressMap = {
  [SupportedChainId.ZKSYNC_ERA]: '0x28731BCC616B5f51dD52CF2e4dF0E78dD1136C06',
  [SupportedChainId.ZKSYNC_ERA_TESTNET]: '0xdC1a9522439D9A8c95726ADf09A0F6785b1528B1',
}
