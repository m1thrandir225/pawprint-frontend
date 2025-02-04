import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import TooltipText from '@/components/TooltipText.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { booleanToText } from '@/lib/utils'
import type { UserDTO } from '@/types/dto/UserDTO'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownActions from './AdopterDropdownActions.vue'

export const columns: ColumnDef<UserDTO>[] = [
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
    id: 'name',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'First Name',
      }),
  },
  {
    accessorKey: 'email',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Email',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('email')),
  },
  {
    accessorKey: 'homeType',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Home Type',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, row.getValue('homeType')),
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
    accessorKey: 'hasChildren',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Has Children',
      }),
    cell: ({ row }) => h('div', { class: 'text-left' }, booleanToText(row.getValue('hasChildren'))),
  },
  {
    accessorKey: 'hasOtherPets',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Has Other Pets',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, booleanToText(row.getValue('hasOtherPets'))),
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
