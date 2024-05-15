import 'expo-dev-client'
import { ThemeProvider as NavProvider } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import styled, { ThemeProvider, type DefaultTheme } from 'styled-components/native'
import { appTheme, navTheme } from 'src/config/theme'
import { myTheme as evaTheme } from 'src/config/evaTheme'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppNavigator } from 'src/components/Navigator'

export default function AppLayout() {
  return (
    <ThemeProvider theme={appTheme as DefaultTheme}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...evaTheme }}>
        <StatusBar style="light" />
        <S.AppWrapper>
          <NavProvider value={navTheme}>
            <AppNavigator />
          </NavProvider>
        </S.AppWrapper>
      </ApplicationProvider>
    </ThemeProvider>
  )
}

const S = {
  AppWrapper: styled.SafeAreaView`
    flex: 1;
    flex-direction: column;
    background-color: ${appTheme.background};
  `
}
