import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

// {
//   id: "728ed52f",
//   amount: 100,
//   status: "pending",
//   email: "m@example.com",
// }

export interface Payment {
  id: string
  amount: number
  status: string
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]