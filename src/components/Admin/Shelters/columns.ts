import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { booleanToText } from '@/lib/utils'
import type { ShelterDTO } from '@/types/dto/ShelterDTO'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownActions from './ShelterDropdownActions.vue'
import TooltipText from '@/components/TooltipText.vue'

export const columns: ColumnDef<ShelterDTO>[] = [
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
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Name',
      }),
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Email',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left truncate max-w-[250px]' }, row.getValue('email')),
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Capacity',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('capacity')),
  },
  {
    accessorKey: 'address',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Address',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('address')),
  },
  {
    accessorKey: 'website',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Website',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left truncate max-w-[150px]' }, row.getValue('website')),
  },
  {
    accessorKey: 'isNoKill',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Is No Kill',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, booleanToText(row.getValue('isNoKill'))),
  },

  {
    id: 'actions',
    enableHiding: false,
    header: () => h('div', { class: 'text-left' }, 'Actions'),
    cell: ({ row }) => {
      const user = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownActions, {
          user,
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
