import { api } from '@/lib/trpc/react'

export const useTeamsOptions = () => {
  const { data: teams, isLoading, error } = api.team.get_teams.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }
  return (
    teams?.map((team) => ({
      value: team.id,
      label: team.name,
      icon: 'team',
    })) ?? []
  )
}

export const useAssigneeOptions = () => {
  const { data: teams, isLoading, error } = api.team.get_teams.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }

  return (
    teams
      ?.map((team) => {
        // Ensure team and user are defined before mapping
        if (team.user) {
          return {
            value: team.user.id,
            label: team.user.name,
            image: team.user.image,
            icon: 'image',
          }
        } else {
          return null
        }
      })
      .filter(Boolean) ?? []
  )
}

export const useProjectOptions = () => {
  const {
    data: projects,
    isLoading,
    error,
  } = api.project.get_projects.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }

  return (
    projects?.map((project) => ({
      value: project.id,
      label: project.name,
      icon: 'hexagon',
    })) ?? []
  )
}

export const useLeadOptions = () => {
  const { data: teams, isLoading, error } = api.team.get_teams.useQuery()

  if (isLoading) {
    return []
  }

  if (error) {
    return []
  }

  return (
    teams
      ?.map((team) => {
        // Ensure team and user are defined before mapping
        if (team.user) {
          return {
            value: team.user.id,
            label: team.user.name,
            image: team.user.image,
            icon: 'image',
          }
        } else {
          return null
        }
      })
      .filter(Boolean) ?? []
  )
}
