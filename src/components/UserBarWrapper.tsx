import React from 'react';
import styled from 'styled-components';

import { deepGray, lightGray, mobile } from '../styles/theme';

interface UserBarWrapperType {
  children: React.ReactNode;
  height: string;
}

const UserBarWrapper: React.FC<UserBarWrapperType> = ({ children, height }) => {
  return <Container height={height}>{children}</Container>;
};

const Container = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    position: fixed;
    left: 0;
    width: 5px;
    padding-left: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2.5px;
    background-color: ${deepGray};
  }

  &::-webkit-scrollbar-track {
    border-radius: 2.5px;
    background-color: ${lightGray};
  }

  @media ${mobile} {
    height: 200px;
  }
`;

export default UserBarWrapper;
