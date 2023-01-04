import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { blue, lightSkyBlue, mobile } from '../styles/theme';

interface PageButtonType {
  text: string;
  goal: string;
}

const PageButton: React.FC<PageButtonType> = ({ text, goal }) => {
  const location = useLocation();

  return (
    <Container className="flex-center" url={location.pathname} goal={goal}>
      <Link to={goal} className="flex-center">
        {text}
      </Link>
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
  }

  @media ${mobile} {
    height: 47.5px;
    width: 50%;
    margin: 0;
    background-color: ${(props) => (props.url === props.goal ? blue : lightSkyBlue)};
    transition: background-color 0.3s;

    a {
      width: 100%;
      height: 100%;
      color: white;
    }
  }

  @media (hover: hover) {
    a {
      &:hover {
        color: ${blue};
        font-weight: 700;
        transition: 0.3s;
      }
    }
  }
`;

export default PageButton;
