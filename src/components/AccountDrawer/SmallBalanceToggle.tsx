import { atomWithStorage } from 'jotai/utils'

export const hideSmallBalancesAtom = atomWithStorage<boolean>('hideSmallBalances', true)

// export function SmallBalanceToggle() {
//   const [hideSmallBalances, updateHideSmallBalances] = useAtom(hideSmallBalancesAtom)

//   return (
//     <Row align="center">
//       <Row width="50%">
//         <ThemedText.SubHeaderSmall color="primary">
//           <Trans>Hide small balances</Trans>
//         </ThemedText.SubHeaderSmall>
//       </Row>
//       <Row width="50%" justify="flex-end">
//         <Toggle
//           isActive={hideSmallBalances}
//           toggle={() => {
//             updateHideSmallBalances(!hideSmallBalances)
//           }}
//         />
//       </Row>
//     </Row>
//   )
// }
