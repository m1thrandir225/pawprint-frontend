import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import TooltipText from '@/components/TooltipText.vue'
import { Checkbox } from '@/components/ui/checkbox'
import type { AdoptionStatus } from '@/types/models/adoptionStatus'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownActions from './AdoptionStatusDropdownActions.vue'

export const columns: ColumnDef<AdoptionStatus>[] = [
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
      const adoptionStatus = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownActions, {
          adoptionStatus,
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
