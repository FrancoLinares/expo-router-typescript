import React from 'react'
import { Styled } from '../../../src/components/styled'
import { TournamentStyled } from './styled'
import CardHeader from './CardHeader'
import { Avatar, Text } from '@ui-kitten/components'
import { FlatList, View } from 'react-native'
import { TournamentByMonth, Tournament as TournamentType } from 'src/types/tournament'
import { isTournamentFinished } from './utils'
import { circuitsLogos } from 'src/components/Home/helpers'
import { FROM, TO } from './constants'

type Props = {
  tournamentsByMonth: TournamentByMonth
}

const TournamentItems = ({ item }: { item: TournamentType }) => (
  <TournamentStyled.Box key={item.id} style={{ width: 170 }} isFinished={isTournamentFinished(item.end_date)}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {circuitsLogos[item.circuit] && (
        <Avatar source={{ uri: circuitsLogos[item.circuit] }} shape="round" style={{ width: 18, height: 18, margin: 10 }} />
      )}
      <TournamentStyled.BoxText category="s1" style={{ fontWeight: 'bold' }}>
        {item.name}
      </TournamentStyled.BoxText>
    </View>
    <TournamentStyled.BoxText category="s2">
      {FROM}
      <Text style={{ fontWeight: 'bold' }}>{item.start_date}</Text> {TO} <Text style={{ fontWeight: 'bold' }}>{item.end_date}</Text>
    </TournamentStyled.BoxText>
    <TournamentStyled.BoxText category="s2">{item.place}</TournamentStyled.BoxText>
  </TournamentStyled.Box>
)

const Tournament = ({ tournamentsByMonth }: Props) => {
  return (
    <Styled.Layout level="1">
      <TournamentStyled.Container style={{ flex: 1 }}>
        {Object.entries(tournamentsByMonth).map(([month, tournaments]) => (
          <TournamentStyled.Card key={month} header={CardHeader({ content: month })}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <FlatList data={tournaments} numColumns={2} renderItem={TournamentItems} keyExtractor={(item) => `${item.id}`} scrollEnabled={false} />
            </View>
          </TournamentStyled.Card>
        ))}
      </TournamentStyled.Container>
    </Styled.Layout>
  )
}

export default Tournament
