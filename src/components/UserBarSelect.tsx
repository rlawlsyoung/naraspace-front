import React from 'react';
import styled from 'styled-components';

import { lightGray, middleBlue } from '../styles/theme';

interface UserBarSelectType {
  name: string;
  date: string;
  handleClick: () => void;
}

const UserBarSelect: React.FC<UserBarSelectType> = ({ name, date, handleClick }) => {
  return (
    <Container onClick={handleClick}>
      <Wrapper>
        <Name>{name}</Name>
        <p>{date}</p>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${lightGray};
`;

const Name = styled.p`
  width: 85px;
`;

export default UserBarSelect;
