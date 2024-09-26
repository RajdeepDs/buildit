import useMyIssuesStore from '@/lib/store/my-issues-store'

export const useMyIssues = () => {
  const filterByStatus = useMyIssuesStore((state) => state.filterByStatus)
  const setFilterByStatus = useMyIssuesStore((state) => state.setFilterByStatus)
  const filterByPriority = useMyIssuesStore((state) => state.filterByPriority)
  const setFilterByPriority = useMyIssuesStore(
    (state) => state.setFilterByPriority,
  )

  return {
    filterByStatus,
    setFilterByStatus,
    filterByPriority,
    setFilterByPriority,
  }
}
