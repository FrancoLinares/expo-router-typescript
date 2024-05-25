// Image
import { Image, Platform } from 'react-native'
import A1Logo from '../../assets/images/circuit/A1-logo.png'
import PremierLogo from '../../assets/images/circuit/premier-logo.webp'
import ServingImg from '../../assets/images/serving.png'
import { Avatar, Text } from '@ui-kitten/components'
import { Match } from 'src/types/match'
import { CircuitMap } from 'src/types/circuit'
import { isMatch } from 'src/components/Home/utils'
import { CardStyled, ListStyled } from './styled'

const A1_LOGO = Platform.OS === 'web' ? A1Logo : Image.resolveAssetSource(A1Logo).uri
const PREMIER_LOGO = Platform.OS === 'web' ? PremierLogo : Image.resolveAssetSource(PremierLogo).uri
const SERVING_IMG = Platform.OS === 'web' ? ServingImg : Image.resolveAssetSource(ServingImg).uri

const circuitsLogos: Record<string, string> = {
  '634b1b8e-3a25-4530-86c2-80b553ad9d45': A1_LOGO,
  'aeda0ba9-3155-40af-a0bb-3b3a7491a06b': PREMIER_LOGO
}

export const Header = (circuitId: string, circuitsMap: CircuitMap | undefined) => {
  const circuitLogoUri = circuitsLogos[circuitId]
  const circuitName = circuitsMap?.[circuitId]?.name

  return (
    <CardStyled.Header>
      {circuitLogoUri && <Avatar source={{ uri: circuitLogoUri }} shape="round" />}
      {circuitName && <CardStyled.HeaderText category="h6">{circuitName}</CardStyled.HeaderText>}
    </CardStyled.Header>
  )
}

export const renderItem = ({ item }: { item: Match; index: number }): React.ReactElement => {
  // Non-null properties type guard
  if (!isMatch(item)) return <Text>-</Text>

  const currentGame = item.currentGame.split('//')
  const playersTeam1 = item.team1.split('//')
  const playersTeam2 = item.team2.split('//')

  return (
    <>
      <ListStyled.Container transparency={!!item.winner && item.winner !== item.team1}>
        <ListStyled.PlayerContainer>
          <ListStyled.Player>
            {playersTeam1.map((player) => (
              <ListStyled.Text key={player} category="s1">
                {player}
              </ListStyled.Text>
            ))}
          </ListStyled.Player>
          <ListStyled.Serving>
            {item.serving === item.team1 && <ListStyled.ServingImg source={{ uri: SERVING_IMG }} shape="round" />}
          </ListStyled.Serving>
        </ListStyled.PlayerContainer>
        <ListStyled.Sets style={{ flex: 1, marginRight: 30 }}>
          <ListStyled.Text category="h6">{currentGame[0]}</ListStyled.Text>
        </ListStyled.Sets>
        <ListStyled.Sets>
          <ListStyled.Text category="s1">{item.set1T1}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set2T1}</ListStyled.Text>
          <ListStyled.Text category="s1">{item.set3T1}</ListStyled.Text>
        </ListStyled.Sets>
      </ListStyled.Container>
      <ListStyled.Container transparency={!!item.winner && item.winner !== item.team2}>
        <ListStyled.PlayerContainer>
          <ListStyled.Player>
            {playersTeam2.map((player) => (
              <ListStyled.Text key={player} category="s1">
                {player}
              </ListStyled.Text>
            ))}
          </ListStyled.Player>
          <ListStyled.Serving>
            {item.serving === item.team2 && <ListStyled.ServingImg source={{ uri: SERVING_IMG }} shape="round" />}
          </ListStyled.Serving>
        </ListStyled.PlayerContainer>
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
