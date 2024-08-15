'use client'

import React from 'react'

import type { Store } from '@/lib/store/my-issues-store'

import { Button } from '@buildit/ui/button'
import { Input } from '@buildit/ui/input'

import { Icons } from '@/components/ui/icons'

/**
 * The search issue component. It contains the search issue input.
 * @param props The component props.
 * @param props.store The store.
 * @returns The search issue component.
 */
export default function SearchIssue({ store }: { store: Store }) {
  const [open, setOpen] = React.useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    store.setSearch(value)
  }

  return (
    <div className='flex items-center space-x-2'>
      <Button
        size={'icon'}
        variant={'ghost'}
        onClick={() => {
          setOpen(!open)
        }}
      >
        <Icons.search className='h-4 w-4' />
      </Button>
      {open && (
        <Input
          placeholder='Type to search'
          value={store.search}
          onChange={handleSearchChange}
        />
      )}
    </div>
  )
}
