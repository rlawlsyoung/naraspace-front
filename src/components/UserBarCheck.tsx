import React from 'react';
import styled from 'styled-components';
import { userDataType } from '../pages/Main';
import { deepGray, middleBlue, deepBlue } from '../styles/theme';

interface UserBarCheckType {
  handleChange: () => void;
  name: string;
  date: string;
  checked: boolean;
}

const UserBarCheck: React.FC<UserBarCheckType> = ({ handleChange, name, date, checked }) => {
  return (
    <Container checked={checked} onClick={handleChange}>
      <Wrapper>
        <InfoWrapper>
          <Name>{name}</Name>
          <p>{date}</p>
        </InfoWrapper>
        <CheckBox type="checkbox" checked={checked} />
      </Wrapper>
    </Container>
  );
};

interface StyledPropsType {
  checked: boolean;
}

const Container = styled.div<StyledPropsType>`
  height: 40px;
  background-color: ${(props) => props.checked && middleBlue};
  color: ${(props) => props.checked && deepBlue};
  cursor: pointer;

  &:last-of-type {
    border: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${deepGray};
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const Name = styled.p`
  width: 85px;
`;

const CheckBox = styled.input`
  cursor: pointer;
`;

export default UserBarCheck;
