import useMyIssuesStore from '@/lib/store/my-issues-store'

export const useMyIssues = () => {
  const filters = useMyIssuesStore((state) => state.filters)
  const addOrUpdateFilter = useMyIssuesStore((state) => state.addOrUpdateFilter)
  const removeFilter = useMyIssuesStore((state) => state.removeFilter)

  return {
    filters,
    addOrUpdateFilter,
    removeFilter,
  }
}
