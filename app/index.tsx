import { useEffect, useMemo, useState } from 'react'
import { ScrollView, SafeAreaView, RefreshControl, View } from 'react-native'
import { Stack } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import ScreenLayout from 'src/components/ScreenLayout'
import { Spinner, Divider, List, Calendar } from '@ui-kitten/components'
import { Match } from 'src/types/match'
import { supabase } from 'src/utils/supabase'
import { useRefreshOnFocus } from 'src/hooks/useRefreshOnFocus'
import { CardStyled, Styled } from './styled'
import { HOME_FINISHED_TITLE, HOME_NO_MATCHES, HOME_TITLE, HOME_UNFINISHED_TITLE } from './constants'
import { Header, renderItem } from './helpers'
import { formatDate, supabaseFormatDate } from 'src/utils/shared'
import { CalendarIcon } from 'src/components/Icons'

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [date, setDate] = useState(new Date())
  const [showCurrentMatches, setShowCurrentMatches] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    onRefresh()
    // Show current matches only if the date is today
    setShowCurrentMatches(formatDate(date) === formatDate(new Date()))

    console.log('date', date)
    console.log('datetoday', new Date())
  }, [date])

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

  const {
    data: matchesHistory,
    isPending: isPendingMatchesHistory,
    refetch: refetchHistory
  } = useQuery({
    queryKey: ['matchesHistory'],
    queryFn: async () => {
      const todayStart = new Date(date.setHours(0, 0, 0, 0))
      console.log('🚀 ~ queryFn: ~ date:', date)
      console.log('🚀 ~ queryFn: ~ todayStart:', todayStart)
      const todayEnd = new Date(date.setHours(23, 59, 59, 999))
      console.log('🚀 ~ queryFn: ~ todayEnd:', todayEnd)

      const { data: scoreHistory, error } = await supabase
        .from('score_history')
        .select('*')
        .gte('created_at', supabaseFormatDate(todayStart))
        .lte('created_at', supabaseFormatDate(todayEnd))

      if (error) throw error

      // Separate matches by circuit
      const matchesByCircuit: Record<string, Match[]> = scoreHistory.reduce((circuits, match) => {
        if (!circuits[match.circuit]) {
          circuits[match.circuit] = []
        }

        circuits[match.circuit].push(match)
        return circuits
      }, {})

      return matchesByCircuit
    },
    staleTime: 5 * (60 * 1000) // 5 mins
  })

  const { data: circuits, isPending: isPendingCircuits } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      const { data: circuits, error } = await supabase.from('circuit').select('*')

      if (error) throw error

      return circuits
    },
    staleTime: 15 * (60 * 1000) // 10 mins
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
    await refetchHistory()
    setRefreshing(false)
  }

  if (isPendingMatches || isPendingCircuits)
    return (
      <Styled.Layout style={{ flex: 1 }} testID="home-screen-layout">
        <Spinner status="basic" />
      </Styled.Layout>
    )

  return (
    !isPendingCircuits && (
      <ScreenLayout testID="home-screen-layout">
        <SafeAreaView>
          <ScrollView style={{ marginBottom: 10 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Styled.Content testID="home-screen-content">
              <Stack.Screen options={{ title: 'Home Screen' }} />

              <Styled.Title testID="home-screen-title" category="h1" style={{ marginTop: 80 }}>
                {HOME_TITLE} - {formatDate(date)}
              </Styled.Title>

              <Styled.Button onPress={() => setShowCalendar(!showCalendar)} accessoryLeft={CalendarIcon} />
              {showCalendar && (
                <Calendar
                  date={date}
                  onSelect={(nextDate) => {
                    setShowCalendar(!showCalendar)
                    setDate(nextDate)
                  }}
                />
              )}

              {showCurrentMatches && (
                <View>
                  <Styled.Title testID="home-screen-title" category="h2">
                    {HOME_UNFINISHED_TITLE}
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
                  {!Object.keys(matches || {})?.length && <Styled.Text category="s1">{HOME_NO_MATCHES}</Styled.Text>}
                </View>
              )}

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
            </Styled.Content>
          </ScrollView>
        </SafeAreaView>
      </ScreenLayout>
    )
  )
}
