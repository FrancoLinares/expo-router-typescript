import { useQuery } from '@tanstack/react-query'
import { TournamentByMonth } from 'src/types/tournament'
import { MONTH_LIST } from 'src/utils/shared'
import { supabase } from 'src/utils/supabase'

const useTournaments = () => {
  const {
    data: tournaments,
    isPending: isPendingTournaments,
    refetch
  } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => {
      const { data: tournaments, error } = await supabase.from('tournaments').select('*')

      if (error) throw error

      return tournaments
    }
  })

  // Separate tournaments by month
  const tournamentsByMonth = tournaments?.reduce((months: TournamentByMonth, tournament) => {
    const month = MONTH_LIST[new Date(tournament.start_date).getMonth()]

    if (month && !months[month]) {
      months[month] = []
    }

    if (month) months[month].push(tournament)

    return months
  }, {})

  return { tournaments, tournamentsByMonth, isPendingTournaments, tournamentsRefresh: refetch }
}

export default useTournaments
