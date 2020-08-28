import { ROLES } from '../constants';
import { getValue } from './localstorage';

export const isAdmin = () => {
  return ROLES.admin === getValue('role');
};

export const isProjectManager = () => {
  return ROLES.projectManager === getValue('role');
};
