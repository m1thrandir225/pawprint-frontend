import DataTableColumnHeader from '@/components/DataTable/DataTableColumnHeader.vue'
import { capitalizeFirstLetter } from '@/lib/utils'
import type { UserRole } from '@/types/models/userRole'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

export const columns: ColumnDef<UserRole>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader, {
        column,
        title: 'Name',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left' }, capitalizeFirstLetter(row.getValue('name'))),
  },
]
