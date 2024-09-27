import useMyIssuesStore from '@/lib/store/my-issues-store'

export const useMyIssues = () => {
  const filters = useMyIssuesStore((state) => state.filters)
  const addOrUpdateFilter = useMyIssuesStore((state) => state.addOrUpdateFilter)
  const removeFilter = useMyIssuesStore((state) => state.removeFilter)

  const groupBy = useMyIssuesStore((state) => state.groupBy)
  const setGroupBy = useMyIssuesStore((state) => state.setGroupBy)

  return {
    filters,
    addOrUpdateFilter,
    removeFilter,
    groupBy,
    setGroupBy,
  }
}
