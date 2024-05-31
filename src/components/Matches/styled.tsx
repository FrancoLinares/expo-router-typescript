import { Avatar, Card, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const ListStyled = {
  Container: styled.View<{ transparency?: boolean }>`
    flex-direction: row;
    justify-content: space-between;
    display: grid;
    grid-template-rows: 40px;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 5px;
    margin: ${(p) => p.theme.size(4, 'px')} 0;
    opacity: ${(p) => (p.transparency === true ? '0.4' : '1')};
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
  `,
  PlayerContainer: styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  `,
  Serving: styled.View`
    margin-left: ${(p) => p.theme.size(10, 'px')};
  `,
  ServingImg: styled(Avatar)`
    height: ${(p) => p.theme.size(10, 'px')};
    width: ${(p) => p.theme.size(10, 'px')};
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
