import React, { useEffect } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { navigate } from '@reach/router';
import { connect } from 'react-redux';

import { isAdmin, isProjectManager } from '../../utils/auth';
import ProjectItem from '../projectItem';

import * as projectActions from '../../actions/projectAction';

import './style.css';
import { ROUTES } from '../../constants';

const ProjectList = (props) => {
  const { projects: projectList, isLoading, error } = props;

  useEffect(() => {
    //  Call API
    props.readProject();
  }, []);

  const handleAdd = () => {
    navigate(ROUTES.projectAdd);
  };

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h3 className="project-title text-center">Projects({projectList.length})</h3>

      <Button className="mr-3 mb-2" onClick={handleAdd}>
        Add Project
      </Button>
      <div className="project-list">
        {projectList.map(({ id, title, description, created_at: createdAt }) => (
          <ProjectItem key={id} id={id} title={title} description={description} created_at={createdAt} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.readProject.projects,

  isLoading: state.readProject.isLoading,

  error: state.readProject.error,
});

const mapDispatchToProps = (dispatch) => ({
  readProject: () => {
    dispatch(projectActions.readProject());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
