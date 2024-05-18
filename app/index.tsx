import { useMemo, useState } from 'react'
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import { Stack } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import ScreenLayout from 'src/components/ScreenLayout'
import { Spinner, Divider, List } from '@ui-kitten/components'
import { Match } from 'src/types/match'
import { supabase } from 'src/utils/supabase'
import { useRefreshOnFocus } from 'src/hooks/useRefreshOnFocus'
import { CardStyled, Styled } from './styled'
import { HOME_TITLE } from './constants'
import { Header, renderItem } from './helpers'

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)

  const {
    data: matches,
    isPending: isPendingMatches,
    refetch
  } = useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      const { data: liveScore, error } = await supabase.from('matches').select('*')

      if (error) throw error

      // Separate matches by circuit
      const matchesByCircuit: Record<string, Match[]> = liveScore.reduce((circuits, match) => {
        if (!circuits[match.circuit]) {
          circuits[match.circuit] = []
        }

        circuits[match.circuit].push(match)
        return circuits
      }, {})

      return matchesByCircuit
    }
  })

  const { data: circuits, isPending: isPendingCircuits } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      const { data: circuits, error } = await supabase.from('circuit').select('*')

      if (error) throw error

      return circuits
    },
    staleTime: 10 * (60 * 1000) // 10 mins
  })
  const circuitsMap = useMemo(
    () =>
      circuits?.reduce((map, circuit) => {
        map[circuit.id] = circuit

        return map
      }, {}),
    [circuits]
  )

  useRefreshOnFocus(refetch)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  if (isPendingMatches || isPendingCircuits)
    return (
      <Styled.Layout style={{ flex: 1 }} testID="home-screen-layout">
        <Spinner status="basic" />
      </Styled.Layout>
    )

  return (
    (!isPendingMatches || !isPendingCircuits) && (
      <ScreenLayout testID="home-screen-layout">
        <SafeAreaView>
          <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Styled.Content testID="home-screen-content">
              <Stack.Screen options={{ title: 'Home Screen' }} />

              <Styled.Title testID="home-screen-title" category="h1">
                {HOME_TITLE}
              </Styled.Title>

              {matches &&
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
            </Styled.Content>
          </ScrollView>
        </SafeAreaView>
      </ScreenLayout>
    )
  )
}
