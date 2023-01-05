import React from 'react';
import styled from 'styled-components';

import { lightGray, middleBlue, deepBlue } from '../styles/theme';

interface UserBarSelectType {
  id: number;
  selectedId: number;
  name: string;
  date: string;
  handleClick: () => void;
}

const UserBarSelect: React.FC<UserBarSelectType> = ({
  id,
  selectedId,
  name,
  date,
  handleClick,
}) => {
  return (
    <Container onClick={handleClick} relevantId={id} selectedId={selectedId}>
      <Wrapper>
        <Name>{name}</Name>
        <p>{date}</p>
      </Wrapper>
    </Container>
  );
};

interface StyledPropsType {
  relevantId: number;
  selectedId: number;
}

const Container = styled.div<StyledPropsType>`
  cursor: pointer;
  &:last-of-type {
    border: none;
  }
  background-color: ${(props) => props.relevantId === props.selectedId && middleBlue};
  color: ${(props) => props.relevantId === props.selectedId && deepBlue};
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
