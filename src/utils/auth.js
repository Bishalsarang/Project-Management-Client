import { getValue, setValue, removeValue } from './localstorage';
import { ROLES } from '../constants';

export const isAdmin = () => {
  return ROLES.admin === getValue('role');
};

export const isProjectManager = () => {
  return ROLES.projectManager === getValue('role');
};
