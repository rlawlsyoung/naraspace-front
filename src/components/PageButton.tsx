import React from 'react';
import { Link, Location, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { blue } from '../styles/theme';

interface PageButtonType {
  text: string;
  goal: string;
}

const PageButton: React.FC<PageButtonType> = ({ text, goal }) => {
  const location = useLocation();

  return (
    <Container url={location.pathname} goal={goal}>
      <Link to={goal}>{text}</Link>
    </Container>
  );
};

interface PropsType {
  url: string;
  goal: string;
}

const Container = styled.div<PropsType>`
  margin: 0 17.5px;
  font-weight: ${(props) => props.url === props.goal && 700};
  a {
    color: ${(props) => (props.url === props.goal ? blue : 'white')};
    &:hover {
      color: ${blue};
      font-weight: 700;
      transition: 0.3s;
    }
  }
`;

export default PageButton;
