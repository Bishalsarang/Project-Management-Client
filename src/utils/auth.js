import { ROLES } from '../constants';
import { getValue } from './localstorage';

export const isAdmin = () => {
  return ROLES.admin === getValue('role');
};

export const isProjectManager = () => {
  return ROLES.projectManager === getValue('role');
};

export const isTeamLeader = () => {
  return ROLES.teamLead === getValue('role');
};

export const isEngineer = () => {
  return ROLES.engineer === getValue('role');
};
