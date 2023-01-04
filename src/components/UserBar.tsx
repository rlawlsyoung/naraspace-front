import React from 'react';
import styled from 'styled-components';

import { deepGray } from '../styles/theme';

interface UserBarType {
  name: string;
  date: string;
}

const UserBar: React.FC<UserBarType> = ({ name, date }) => {
  return (
    <Container>
      <Wrapper>
        <Name>{name}</Name>
        <p>{date}</p>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  min-height: 40px;
  cursor: pointer;

  &:last-of-type {
    border: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${deepGray};
`;

const Name = styled.p`
  width: 85px;
`;

export default UserBar;
