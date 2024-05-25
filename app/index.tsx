import { useEffect, useState } from 'react'
import { ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import { Stack } from 'expo-router'
import ScreenLayout from 'src/components/ScreenLayout'
import { Spinner } from '@ui-kitten/components'
import { useRefreshOnFocus } from 'src/hooks/useRefreshOnFocus'
import { Styled } from './styled'
import { DAY_MILLISECONDS, HOME_TITLE } from './constants'
import { formatDate } from 'src/utils/shared'
import useMatches from 'src/hooks/useMatches'
import useMatchesHistory from 'src/hooks/useMatchesHistory'
import useCircuits from 'src/hooks/useCircuits'
import CurrentMatches from 'src/components/Home/CurrentMatches'
import HistoryMatches from 'src/components/Home/HistoryMatches'
import HomeCalendar from 'src/components/Home/Calendar'

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false)
  const [date, setDate] = useState(new Date())
  const [showCurrentMatches, setShowCurrentMatches] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)

  useEffect(() => {
    onRefresh()

    // Add a day to the date - this is needed for the calendar
    const dateToVerify = new Date(date.getTime() + DAY_MILLISECONDS)
    const todayDate = new Date()

    if (formatDate(dateToVerify) > formatDate(todayDate)) {
      dateToVerify.setDate(dateToVerify.getDate() - 1)
    }

    // Show current matches only if the date is today
    setShowCurrentMatches(formatDate(dateToVerify) === formatDate(todayDate))
  }, [date])

  const { matches, isPendingMatches, matchesRefetch } = useMatches()

  const { matchesHistory, isPendingMatchesHistory, refetchHistory } = useMatchesHistory(date)

  const { isPendingCircuits, circuitsMap } = useCircuits()

  useRefreshOnFocus(matchesRefetch)

  const onRefresh = async () => {
    setRefreshing(true)
    await matchesRefetch()
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
              {/* Title */}
              <Styled.Title testID="home-screen-title" category="h1" style={{ marginTop: 80 }}>
                {HOME_TITLE} - {formatDate(date)}
              </Styled.Title>
              {/* Calendar  */}
              <HomeCalendar {...{ setShowCalendar, date, setDate, showCalendar }} />
              {/* Current Matches */}
              {showCurrentMatches && <CurrentMatches {...{ isPendingMatches, matches: matches || {}, circuitsMap }} />}
              {/* Matches History */}
              <HistoryMatches {...{ isPendingMatchesHistory, matchesHistory: matchesHistory || {}, circuitsMap }} />
            </Styled.Content>
          </ScrollView>
        </SafeAreaView>
      </ScreenLayout>
    )
  )
}
