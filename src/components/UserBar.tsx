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
      <CheckBox type="checkbox" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${deepGray};

  &:last-of-type {
    border: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Name = styled.p`
  width: 85px;
`;

const CheckBox = styled.input``;

export default UserBar;
