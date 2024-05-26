import { Card, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const TournamentStyled = {
  Container: styled.View`
    width: 90%;
    flex-direction: row,
    flex-wrap: wrap,
  `,
  Card: styled(Card)`
    border: 0px solid ${(p) => p.theme.primary};
    background-color: ${(p) => p.theme.background};
  `,
  Title: styled(Text)`
    color: ${(p) => p.theme.primary};
  `,
  Box: styled.View`
    flex-direction: row';
    align-items: center;
    justify-content: space-around;
  `
}
