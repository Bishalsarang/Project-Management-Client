import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import ProjectItem from '../projectItem';

import * as projectActions from '../../actions/projectAction';

import './style.css';

const ProjectList = (props) => {
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    //  Call API
    props
      .readProject()
      .then((data) => setProjectList(data))
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (props.isLoading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <h3 className="project-title text-center">Projects({projectList.length})</h3>
      <div className="project-list">
        {projectList.map(({ id, title, description, created_at: createdAt }) => (
          <ProjectItem key={id} id={id} title={title} description={description} created_at={createdAt} />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.readProject.tasks,
  isLoading: state.readProject.isLoading,
  error: state.readProject.error,
});

const mapDispatchToProps = (dispatch) => ({
  readProject: () => {
    return dispatch(projectActions.readProject());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
