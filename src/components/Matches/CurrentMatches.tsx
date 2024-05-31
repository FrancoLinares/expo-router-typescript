import { Divider, List } from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { CircuitMap } from 'src/types/circuit'
import { MatchesMap } from 'src/types/match'
import { Header, renderItem } from './helpers'
import { MATCHES_NO_MATCHES, MATCHES_UNFINISHED_TITLE } from './constants'
import { CardStyled } from './styled'
import { Styled } from '../styled'

type Props = {
  isPendingMatches: boolean
  matches: MatchesMap
  circuitsMap: CircuitMap | undefined
}

function CurrentMatches({ isPendingMatches, matches, circuitsMap }: Props) {
  return (
    <View>
      <Styled.Title testID="home-screen-title" category="h2">
        {MATCHES_UNFINISHED_TITLE}
      </Styled.Title>
      {!isPendingMatches &&
        matches &&
        Object.entries(matches).map(([circuitId, match]) => (
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
      {!Object.keys(matches || {})?.length && <Styled.Text category="s1">{MATCHES_NO_MATCHES}</Styled.Text>}
    </View>
  )
}

export default CurrentMatches
