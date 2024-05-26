import { View } from 'react-native'
import { TournamentStyled } from './styled'

type Props = {
  content: string
}

const CardHeader = ({ content }: Props) => {
  return (
    <View>
      <TournamentStyled.Title category="h5">{content}</TournamentStyled.Title>
    </View>
  )
}

export default CardHeader
