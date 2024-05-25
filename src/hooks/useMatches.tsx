import { useQuery } from '@tanstack/react-query'
import { MatchesMap } from 'src/types/match'
import { supabase } from 'src/utils/supabase'

const useMatches = () => {
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
      const matchesByCircuit: MatchesMap = liveScore.reduce((circuits: MatchesMap, match) => {
        if (match.circuit && !circuits[match.circuit]) {
          circuits[match.circuit] = []
        }

        if (match.circuit) circuits[match.circuit].push(match)

        return circuits
      }, {})

      return matchesByCircuit
    }
  })

  return { matches, isPendingMatches, matchesRefetch: refetch }
}

export default useMatches
