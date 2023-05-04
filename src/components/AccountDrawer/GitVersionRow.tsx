import styled from 'styled-components/macro'

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`

// export function GitVersionRow() {
//   const [isCopied, staticCopy] = useCopyClipboard()
//   return process.env.REACT_APP_GIT_COMMIT_HASH ? (
//     <Container
//       onClick={() => {
//         staticCopy(process.env.REACT_APP_GIT_COMMIT_HASH as string)
//       }}
//     >
//       <Tooltip text="Copied" show={isCopied}>
//         <ThemedText.BodySmall color="textTertiary">
//           <Trans>Version: </Trans>
//           {' ' + process.env.REACT_APP_GIT_COMMIT_HASH.substring(0, 6)}
//         </ThemedText.BodySmall>
//       </Tooltip>
//     </Container>
//   ) : null
// }
