// Image
import { Image } from 'react-native'
import A1Logo from '../src/assets/images/circuit/A1-logo.png'
import PremierLogo from '../src/assets/images/circuit/premier-logo.webp'
import { Avatar } from '@ui-kitten/components'
import { CardStyled, ListStyled } from './styled'
import { Match } from 'src/types/match'

const A1_LOGO = Image.resolveAssetSource(A1Logo).uri
const PREMIER_LOGO = Image.resolveAssetSource(PremierLogo).uri

const circuitsLogos: Record<string, string> = {
  '634b1b8e-3a25-4530-86c2-80b553ad9d45': A1_LOGO,
  'aeda0ba9-3155-40af-a0bb-3b3a7491a06b': PREMIER_LOGO
}

export const Header = (circuitId: string, circuitsMap: Record<string, { name: string }>) => (
  <CardStyled.Header>
    <Avatar source={{ uri: circuitsLogos[circuitId] }} shape="round" />
    <CardStyled.HeaderText category="h6">{circuitsMap[circuitId].name}</CardStyled.HeaderText>
  </CardStyled.Header>
)

export const renderItem = ({ item }: { item: Match; index: number }): React.ReactElement => {
  const currentGame = item.currentGame.split('//')
  const playersTeam1 = item.team1.split('//')
  const playersTeam2 = item.team2.split('//')

  return (
    <>
      <ListStyled.Container>
        <ListStyled.Player>
          {playersTeam1.map((player) => (
            <ListStyled.Text key={player} category="s1">
              {player}
            </ListStyled.Text>
          ))}
        </ListStyled.Player>
        <ListStyled.Sets style={{ flex: 1, marginRight: 30 }}>
          <ListStyled.Text category="h6">{currentGame[0]}</ListStyled.Text>
        </ListStyled.Sets>
        <ListStyled.Sets>
          <ListStyled.Text category="s1">{item.set1T1}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set2T1}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set3T1}</ListStyled.Text>
        </ListStyled.Sets>
      </ListStyled.Container>
      <ListStyled.Container>
        <ListStyled.Player>
          {playersTeam2.map((player) => (
            <ListStyled.Text key={player} category="s1">
              {player}
            </ListStyled.Text>
          ))}
        </ListStyled.Player>
        <ListStyled.Sets style={{ flex: 1, marginRight: 30 }}>
          <ListStyled.Text category="h6">{currentGame[1]}</ListStyled.Text>
        </ListStyled.Sets>
        <ListStyled.Sets>
          <ListStyled.Text category="s1">{item.set1T2}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set2T2}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set3T2}</ListStyled.Text>
        </ListStyled.Sets>
      </ListStyled.Container>
    </>
  )
}
