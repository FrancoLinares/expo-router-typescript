import { Card, Layout, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const ListStyled = {
  Container: styled.View`
    flex-direction: row;
    justify-content: space-between;
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 5px;
    margin: ${(p) => p.theme.size(4, 'px')} 0;
  `,
  Player: styled.View`
    flex-direction: column;
  `,
  Sets: styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `,
  Text: styled(Text)`
    margin-left: ${(p) => p.theme.size(5, 'px')};
    padding: ${(p) => p.theme.size(1, 'px')};
  `
}

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
  `
}

export const CardStyled = {
  Container: styled.View`
    width: 90%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
  `,
  Box: styled(Card)`
    margin-top: ${(p) => p.theme.size(20, 'px')};
    width: 100%;
  `,
  Header: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  HeaderText: styled(Text)`
    margin-left: ${(p) => p.theme.size(10, 'px')};
  `
}
