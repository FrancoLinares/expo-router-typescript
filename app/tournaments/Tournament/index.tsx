import React from 'react'
import { Styled } from '../../../src/components/styled'
import { TournamentStyled } from './styled'
import CardHeader from './CardHeader'
import useTournaments from 'src/hooks/useTournaments'
import { Text } from '@ui-kitten/components'
import { View } from 'react-native'

const Tournament = () => {
  const { tournamentsByMonth = {} } = useTournaments()
  console.log('🚀 ~ Tournament ~ tournamentsByMonth:', tournamentsByMonth)

  return (
    <Styled.Layout level="1">
      <TournamentStyled.Container>
        {Object.entries(tournamentsByMonth).map(([month, tournaments]) => (
          <TournamentStyled.Card key={month} header={CardHeader({ content: month })} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              {tournaments.map((tournament) => (
                <TournamentStyled.Box key={tournament.id} style={{ width: 150 }}>
                  <Text>{tournament.name}</Text>
                </TournamentStyled.Box>
              ))}
            </View>
          </TournamentStyled.Card>
        ))}
      </TournamentStyled.Container>
    </Styled.Layout>
  )
}

export default Tournament
