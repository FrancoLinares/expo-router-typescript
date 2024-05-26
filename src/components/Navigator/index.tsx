import React from 'react'
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components'
import { Slot, router } from 'expo-router'
import { AwardIcon, ClockIcon, StarIcon } from '../Icons'

export const AppNavigator = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // Every screen needs a path
  // All the paths are organized in an array
  // The path is used to navigate to the screen
  const MAP_SCREEN_URLS = ['/', '/tournaments']

  return (
    <>
      <Slot />
      <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          setSelectedIndex(index)
          // Navigate to the selected screen (path)
          router.replace(MAP_SCREEN_URLS[index])
        }}>
        <BottomNavigationTab title="Partidos" icon={ClockIcon} />
        <BottomNavigationTab title="Torneos" icon={AwardIcon} />
        <BottomNavigationTab title="Favoritos" icon={StarIcon} />
      </BottomNavigation>
    </>
  )
}
