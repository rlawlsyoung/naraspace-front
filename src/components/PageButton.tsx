import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { deepBlue, lightBlue, mobile } from '../styles/theme';

interface PageButtonType {
  text: string;
  goal: string;
}

const PageButton: React.FC<PageButtonType> = ({ text, goal }) => {
  const location = useLocation();

  const cutUrlLength = (url: string) => {
    if (url.length > 5) return url.substr(0, 5);
    else return url;
  };

  return (
    <Container className="flex-center" url={cutUrlLength(location.pathname)} goal={goal}>
      <Link to={goal} className="flex-center">
        {text}
      </Link>
    </Container>
  );
};

interface StyledPropsType {
  url: string;
  goal: string;
}

const Container = styled.div<StyledPropsType>`
  width: 70px;
  margin: 0 17.5px;
  font-weight: ${(props) => props.url === props.goal && 700};

  a {
    color: ${(props) => (props.url === props.goal ? deepBlue : 'white')};
  }

  @media ${mobile} {
    height: 50px;
    width: 50%;
    margin: 0;
    background-color: ${(props) => (props.url === props.goal ? deepBlue : lightBlue)};
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
        color: ${deepBlue};
        font-weight: 700;
        transition: 0.3s;
      }
    }
  }
`;

export default PageButton;
