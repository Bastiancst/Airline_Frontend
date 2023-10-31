import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    requiresRole: ["Admin"]
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
    requiresRole: ["Admin"]
  },
  {
    navCap: 'Ui Components',
    requiresRole: ["Client","Employee","Admin"]
  },
  {
    displayName: 'User Panel',
    iconName: 'user-circle',
    route: '/ui-components/user-panel',
    requiresRole: ["Client","Employee","Admin"]
  },
  {
    displayName: 'Employee',
    iconName: 'rosette',
    route: '/ui-components/employee',
    requiresRole: ["Admin"]
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
];
