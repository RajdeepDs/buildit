import { useMemo } from 'react'

import type { TProject } from '@buildit/utils/types'

type LeadCount = Record<string, number>

/**
 * Extracts the unique leads and their counts from the given projects.
 * @param data The list of projects.
 * @returns An object containing the unique leads and their counts.
 */
export function useLeadsSummary(data: TProject[] | undefined) {
  return useMemo(() => {
    if (!data) {
      return {
        uniqueLeads: [],
        leadCount: {},
      }
    }

    const result = data.reduce(
      (acc, { leadId }) => {
        const leadKey = leadId ?? 'No Lead' // Handle null/undefined leadId as "No Lead"

        if (!acc.uniqueLeads.has(leadKey)) {
          acc.uniqueLeads.add(leadKey)
        }

        acc.leadCount[leadKey] = (acc.leadCount[leadKey] || 0) + 1

        return acc
      },
      {
        uniqueLeads: new Set<string>(),
        leadCount: {} as LeadCount,
      },
    )

    return {
      uniqueLeads: Array.from(result.uniqueLeads), // Convert Set back to an array
      leadCount: result.leadCount,
    }
  }, [data])
}
