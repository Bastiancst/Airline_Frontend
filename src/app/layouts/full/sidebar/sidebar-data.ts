import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'User Panel',
    iconName: 'user-circle',
    route: '/ui-components/user-panel',
  },
  {
    displayName: 'Employee',
    iconName: 'rosette',
    route: '/ui-components/employee',
  },
  {
    displayName: 'Assigment',
    iconName: 'rosette',
    route: '/ui-components/assigment',
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
