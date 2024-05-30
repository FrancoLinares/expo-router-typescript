import { Card, Text } from '@ui-kitten/components'
import styled from 'styled-components/native'

export const TournamentStyled = {
  Container: styled.View`
    flex-direction: row,
    flex-wrap: no-wrap,
  `,
  Card: styled(Card)`
    border: 0px solid ${(p) => p.theme.primary};
    background-color: ${(p) => p.theme.background};
  `,
  Title: styled(Text)`
    color: ${(p) => p.theme.primary};
  `,
  Box: styled.View<{ isFinished: boolean }>`
    flex-direction: row';
    align-items: center;
    justify-content: space-around;
    margin-right: ${(p) => p.theme.size(13, 'px')};
    margin-bottom: ${(p) => p.theme.size(10, 'px')};
    text-align: center;
    border-radius: ${(p) => p.theme.size(5, 'px')};
    background-color: ${(p) => p.theme.winner};
    padding: ${(p) => p.theme.size(3, 'px')};
    padding-bottom: ${(p) => p.theme.size(10, 'px')};
    opacity: ${(p) => (p.isFinished ? 0.5 : 1)};
  `,
  BoxText: styled(Text)<{ category: string }>`
    padding-bottom: ${(p) => p.theme.size(10, 'px')};
  `
}
