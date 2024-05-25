import { Divider, List } from '@ui-kitten/components'
import React from 'react'
import { CardStyled } from './styled'
import { View } from 'react-native'
import { CircuitMap } from 'src/types/circuit'
import { MatchesMap } from 'src/types/match'
import { Header, renderItem } from './helpers'
import { HOME_FINISHED_TITLE, HOME_NO_MATCHES } from './constants'
import { Styled } from '../styled'

type Props = {
  isPendingMatchesHistory: boolean
  matchesHistory: MatchesMap
  circuitsMap: CircuitMap | undefined
}

const HistoryMatches = ({ isPendingMatchesHistory, matchesHistory, circuitsMap }: Props) => {
  return (
    <View>
      <Styled.Title testID="home-screen-title" category="h2">
        {HOME_FINISHED_TITLE}
      </Styled.Title>
      {!isPendingMatchesHistory &&
        matchesHistory &&
        Object.entries(matchesHistory).map(([circuitId, match]) => (
          <CardStyled.Container key={circuitId}>
            <CardStyled.Box status="primary" header={Header(circuitId, circuitsMap)}>
              <List
                scrollEnabled={false}
                data={match}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
                style={{ backgroundColor: 'transparent' }}
              />
            </CardStyled.Box>
          </CardStyled.Container>
        ))}
      {!Object.keys(matchesHistory || {})?.length && <Styled.Text category="s1">{HOME_NO_MATCHES}</Styled.Text>}
    </View>
  )
}

export default HistoryMatches
