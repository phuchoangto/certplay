import { Search, SquareTerminal } from "lucide-vue-next"

export interface NavItem {
  label: string,
  icon: any,
  href: string
}

export const items: NavItem[] = [
  {
    label: 'Dashboard',
    icon: SquareTerminal,
    href: '/',
  },
  {
    label: 'Search',
    icon: Search,
    href: '/start',
  },
]