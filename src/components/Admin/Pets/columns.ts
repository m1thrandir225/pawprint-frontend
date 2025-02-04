import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import TooltipText from '@/components/TooltipText.vue'
import { Checkbox } from '@/components/ui/checkbox'
import type { Pet } from '@/types/models/pet'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownActions from './DropdownActions.vue'

export const columns: ColumnDef<Pet>[] = [
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
        { class: 'text-left truncate max-w-[50px]' },
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
    id: 'petType',
    accessorFn: ({ petType }) => petType.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Type',
      }),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('petType'))
    },
  },
  {
    accessorKey: 'breed',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Breed',
      }),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('breed'))
    },
  },
  {
    accessorKey: 'ageYears',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Age',
      }),
    cell: ({ row }) => {
      return h('div', { class: 'text-left' }, row.getValue('ageYears'))
    },
  },

  {
    id: 'petGender',
    accessorFn: ({ petGender }) => petGender.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Gender',
      }),
  },
  {
    id: 'petSize',
    accessorFn: ({ petSize }) => petSize.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Size',
      }),
  },
  {
    id: 'adoptionStatus',
    accessorFn: ({ adoptionStatus }) => adoptionStatus.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Adoption',
      }),
  },
  {
    id: 'healthStatus',
    accessorFn: ({ healthStatus }) => healthStatus.name,
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Health',
      }),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => h('div', { class: 'text-right' }, 'Actions'),
    cell: ({ row }) => {
      const pet = row.original

      return h(
        'div',
        { class: 'relative' },
        h(DropdownActions, {
          pet,
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
