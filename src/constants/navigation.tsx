import paths from '../routes/paths'
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  Boxes,
  ShoppingCart,
  Video,
  BookOpen,
  AlertTriangle,
  BriefcaseBusiness,
} from 'lucide-react'

export const UserSidebarLinks = [
  {
    label: 'Dashboard',
    href: paths.dashboard,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Users',
    href: paths.users,
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Merchants',
    href: paths.merchants,
    icon: <Store className="w-5 h-5" />,
  },
  {
    label: 'Schools',
    href: paths.schools,
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: 'Products',
    href: paths.products,
    icon: <Package className="w-5 h-5" />,
  },
  {
    label: 'Categories',
    href: paths.categories,
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    label: 'Orders',
    href: paths.orders,
    icon: <ShoppingCart className="w-5 h-5" />,
  },
  {
    label: 'Videos',
    href: paths.videos,
    icon: <Video className="w-5 h-5" />,
  },
  {
    label: 'Quran Verses',
    href: paths.quranVerses,
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: 'Mosques',
    href: paths.mosques,
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: 'Businesses',
    href: paths.businesses,
    icon: <BriefcaseBusiness className="w-5 h-5" />,
  },
  {
    label: 'Reported Issues',
    href: paths.reportedIssues,
    icon: <AlertTriangle className="w-5 h-5" />,
  },
]
