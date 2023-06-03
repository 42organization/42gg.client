// import { css } from '@emotion/react';
// import styled from '@emotion/styled';

// const gameContainer = css({
//   position: 'relative',
//   display: 'grid',
//   gridTemplateColumns: '2fr 1fr 2fr',
//   boxSizing: 'border-box',
//   boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
// });

// const smallGameContainer = (isFirst: boolean) =>
//   css({
//     alignItems: 'end',
//     minWidth: '19.874rem',
//     borderRadius: '0.938rem',
//     height: '4.491rem',
//     padding: '0.505rem 0.954rem',
//     margin: isFirst ? '0 0.978rem' : '-1.591rem 0.978rem',
//   });

// const bigGameContainer = css({
//   alignItems: 'center',
//   minWidth: '22.125rem',
//   borderRadius: '1.5rem',
//   height: '6.091rem',
//   padding: '0.5rem 0',
// });

// export const BigGameContainer = styled.div<{
//   zIndex: number;
//   type: 'LIGHT' | 'DARK';
// }>`
//   ${gameContainer};
//   ${bigGameContainer};
//   background: ${({ type }) =>
//     type === 'LIGHT'
//       ? 'linear-gradient(89.97deg, #8034f7 11.73%, #8120c3 99.97%)'
//       : 'linear-gradient(180deg, #631db2 0%, #6a0db3 100%)'};
//   z-index: ${({ zIndex }) => zIndex};
// `;

// export const SmallGameContiainer = styled.div<{
//   isFirst: boolean;
//   zIndex: number;
//   type: 'LIGHT' | 'DARK';
// }>`
//   ${gameContainer};
//   ${({ isFirst }) => smallGameContainer(isFirst)};
//   background: ${({ type }) =>
//     type === 'LIGHT'
//       ? 'linear-gradient(89.97deg, #8034f7 11.73%, #8120c3 99.97%)'
//       : 'linear-gradient(180deg, #631db2 0%, #6a0db3 100%)'};
//   z-index: ${({ zIndex }) => zIndex};
// `;
