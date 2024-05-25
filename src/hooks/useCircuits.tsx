import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { CircuitMap } from 'src/types/circuit'
import { supabase } from 'src/utils/supabase'

const useCircuits = () => {
  const { data: circuits, isPending: isPendingCircuits } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      const { data: circuits, error } = await supabase.from('circuit').select('*')

      if (error) throw error

      return circuits
    },
    staleTime: 15 * (60 * 1000) // 10 mins
  })
  // Memoize circuits map
  const circuitsMap = useMemo(
    () =>
      circuits?.reduce((map: CircuitMap, circuit) => {
        map[circuit.id] = circuit

        return map
      }, {}),
    [circuits]
  )

  return {
    circuits,
    isPendingCircuits,
    circuitsMap
  }
}

export default useCircuits
