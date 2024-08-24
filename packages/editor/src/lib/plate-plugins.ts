import {
  createBasicElementsPlugin,
  createBasicMarksPlugin,
  createPlugins,
} from '@udecode/plate'
import { createListPlugin, createTodoListPlugin } from '@udecode/plate-list'

import { createPlateUI } from './create-plate-ui'
import { createSlashPlugin } from './createSlashPlugin'

export const platePlugins = createPlugins(
  [
    createBasicElementsPlugin(),
    createBasicMarksPlugin(),
    createListPlugin(),
    createTodoListPlugin(),
    createSlashPlugin(),
  ],
  {
    components: createPlateUI(),
  },
)
