'use client'

/* eslint-disable unicorn/prefer-export-from */
import { useState } from 'react'

import { cn } from '@udecode/cn'
import {
  useCodeBlockCombobox,
  useCodeBlockComboboxState,
} from '@udecode/plate-code-block/react'
// Prism must be imported before all language files
import Prism from 'prismjs'

import { Button } from '@buildit/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@buildit/ui/popover'

import { Icons } from '../icons'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './command'

import 'prismjs/components/prism-antlr4.js'
import 'prismjs/components/prism-bash.js'
import 'prismjs/components/prism-c.js'
import 'prismjs/components/prism-cmake.js'
import 'prismjs/components/prism-coffeescript.js'
import 'prismjs/components/prism-cpp.js'
import 'prismjs/components/prism-csharp.js'
import 'prismjs/components/prism-css.js'
import 'prismjs/components/prism-dart.js'
// import 'prismjs/components/prism-django.js';
import 'prismjs/components/prism-docker.js'
// import 'prismjs/components/prism-ejs.js';
import 'prismjs/components/prism-erlang.js'
import 'prismjs/components/prism-git.js'
import 'prismjs/components/prism-go.js'
import 'prismjs/components/prism-graphql.js'
import 'prismjs/components/prism-groovy.js'
import 'prismjs/components/prism-java.js'
import 'prismjs/components/prism-javascript.js'
import 'prismjs/components/prism-json.js'
import 'prismjs/components/prism-jsx.js'
import 'prismjs/components/prism-kotlin.js'
import 'prismjs/components/prism-latex.js'
import 'prismjs/components/prism-less.js'
import 'prismjs/components/prism-lua.js'
import 'prismjs/components/prism-makefile.js'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-matlab.js'
import 'prismjs/components/prism-mermaid.js'
import 'prismjs/components/prism-objectivec.js'
import 'prismjs/components/prism-perl.js'
// import 'prismjs/components/prism-php.js';
import 'prismjs/components/prism-powershell.js'
import 'prismjs/components/prism-properties.js'
import 'prismjs/components/prism-protobuf.js'
import 'prismjs/components/prism-python.js'
import 'prismjs/components/prism-r.js'
import 'prismjs/components/prism-ruby.js'
import 'prismjs/components/prism-sass.js'
import 'prismjs/components/prism-scala.js'
import 'prismjs/components/prism-scheme.js'
import 'prismjs/components/prism-scss.js'
import 'prismjs/components/prism-sql.js'
import 'prismjs/components/prism-swift.js'
import 'prismjs/components/prism-tsx.js'
import 'prismjs/components/prism-typescript.js'
import 'prismjs/components/prism-wasm.js'
import 'prismjs/components/prism-yaml.js'

export { Prism }

const languages: { label: string; value: string }[] = [
  { label: 'Plain Text', value: 'text' },
  { label: 'Bash', value: 'bash' },
  { label: 'CSS', value: 'css' },
  { label: 'Git', value: 'git' },
  { label: 'GraphQL', value: 'graphql' },
  { label: 'HTML', value: 'html' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'JSON', value: 'json' },
  { label: 'JSX', value: 'jsx' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'SQL', value: 'sql' },
  { label: 'SVG', value: 'svg' },
  { label: 'TSX', value: 'tsx' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'C', value: 'c' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'PHP', value: 'php' },
  { label: 'PowerShell', value: 'powershell' },
  { label: 'Python', value: 'python' },
  { label: 'Shell', value: 'shell' },
  { label: 'YAML', value: 'yaml' },
]

/**
 * The code block combobox component.
 * @returns JSX.Element
 */
export function CodeBlockCombobox() {
  const state = useCodeBlockComboboxState()
  const { commandItemProps } = useCodeBlockCombobox(state)

  const [open, setOpen] = useState(false)

  if (state.readOnly) return null

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className='h-6 justify-between px-1 text-xs text-sub outline-none'
          role='combobox'
          size='sm'
          variant='ghost'
        >
          {state.value
            ? languages.find((language) => language.value === state.value)
                ?.label
            : 'Plain Text'}
          <Icons.chevronsUpDown className='ml-2 size-3 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search language...' className='' />
          <CommandEmpty>No language found.</CommandEmpty>

          <CommandList className='h-32'>
            {languages.map((language) => (
              <CommandItem
                className='cursor-pointer'
                key={language.value}
                onSelect={(_value) => {
                  commandItemProps.onSelect(_value)
                  setOpen(false)
                }}
                value={language.value}
              >
                <Icons.check
                  className={cn(
                    'mr-2 size-4',
                    state.value === language.value
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
