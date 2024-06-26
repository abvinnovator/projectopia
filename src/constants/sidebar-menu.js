import DashboardIcon from '../assets/icons/dashboard.svg';
import ShippingIcon from '../assets/icons/shipping.svg';
import ProductIcon from '../assets/icons/product.svg';
import UserIcon from '../assets/icons/user.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ProductIcon,
        path: '/orders',
        title: 'Projects',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/tasks',
        title: 'Tasks',
    },
    {
        id: 4,
        icon: UserIcon,
        path: '/milestones',
        title: 'Milestones',
    }
]

export default sidebar_menu;