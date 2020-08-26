import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ProjectItem from '../projectItem';

const ProjectList = () => {
  return (
    <ListGroup horizontal>
      <ListGroup.Item>
        <ProjectItem title="Project 1" description="haha" />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ProjectList;
