import { Stack } from 'expo-router'
import { RefreshControl, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScreenLayout from 'src/components/ScreenLayout'
import { Styled } from 'src/components/styled'
import { CIRCUITS_TITLE } from './constants'

export default function Torunaments() {
  const currentYear = new Date().getFullYear()

  return (
    <ScreenLayout testID="circuits-screen-layout">
      <SafeAreaView>
        <ScrollView style={{ marginBottom: 10 }}>
          <Styled.Content testID="circuits-screen-content">
            <Stack.Screen options={{ title: 'Tournaments Screen' }} />
            {/* Title */}
            <Styled.Title testID="circuits-screen-title" category="h1" style={{ marginTop: 80 }}>
              {CIRCUITS_TITLE} {currentYear}
            </Styled.Title>
          </Styled.Content>
        </ScrollView>
      </SafeAreaView>
    </ScreenLayout>
  )
}
