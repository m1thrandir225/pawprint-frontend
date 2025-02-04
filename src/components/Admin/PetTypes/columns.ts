import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import TooltipText from '@/components/TooltipText.vue'
import { Checkbox } from '@/components/ui/checkbox'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownActions from './PetTypeDropdownActions.vue'
import type { PetType } from '@/types/models/petType'

export const columns: ColumnDef<PetType>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) => {
      const text = row.original.id
      return h(
        'div',
        { class: 'text-left truncate' },
        h(TooltipText, {
          text: text,
          tooltip: text,
        }),
      )
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Name',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('name')),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => h('div', { class: 'text-left' }, 'Actions'),
    cell: ({ row }) => {
      const petType = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownActions, {
          petType,
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
