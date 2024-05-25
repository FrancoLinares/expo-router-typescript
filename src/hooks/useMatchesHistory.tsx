import { useQuery } from '@tanstack/react-query'
import { MatchesMap } from 'src/types/match'
import { supabaseFormatDate } from 'src/utils/shared'
import { supabase } from 'src/utils/supabase'

const useMatchesHistory = (date: Date) => {
  const {
    data: matchesHistory,
    isPending: isPendingMatchesHistory,
    refetch: refetchHistory
  } = useQuery({
    queryKey: ['matchesHistory'],
    queryFn: async () => {
      const todayStart = new Date(date.setHours(0, 0, 0, 0))
      const todayEnd = new Date(date.setHours(23, 59, 59, 999))

      const { data: scoreHistory, error } = await supabase
        .from('score_history')
        .select('*')
        .gte('created_at', supabaseFormatDate(todayStart))
        .lte('created_at', supabaseFormatDate(todayEnd))

      if (error) throw error

      // Separate matches by circuit
      const matchesByCircuit: MatchesMap = scoreHistory.reduce((circuits: MatchesMap, match) => {
        if (match.circuit && !circuits[match.circuit]) {
          circuits[match.circuit] = []
        }

        if (match.circuit) {
          circuits[match.circuit].push(match)
        }

        return circuits
      }, {})

      return matchesByCircuit
    },
    staleTime: 5 * (60 * 1000) // 5 mins
  })

  return { matchesHistory, isPendingMatchesHistory, refetchHistory }
}

export default useMatchesHistory
