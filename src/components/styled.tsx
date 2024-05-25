import { Button, Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const Styled = {
  Content: styled.View`
    align-items: center;
  `,
  Title: styled(Text)`
    color: ${(p) => p.theme.primary};
    margin-top: ${(p) => p.theme.size(30, 'px')};
  `,
  Layout: styled(Layout)`
    flex-direction: row,
    justify-content: center;
    flex-wrap: wrap,
    align-items: center;
  `,
  Text: styled(Text)`
    color: ${(p) => p.theme.primary};
  `,
  Button: styled(Button)`
    background-color: 'transparent';
  `
}
