import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import styled from 'styled-components';

import { lightGray, middleBlue, deepBlue, deepGray } from '../styles/theme';

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
        <CheckboxContainer>
          <CheckBox checked={checked} className="flex-center">
            <HiddenCheckbox type="checkbox" checked={checked} readOnly />
            {checked && <Check size={10} color="white" />}
          </CheckBox>
        </CheckboxContainer>
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
  border-bottom: 1px solid ${lightGray};
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const Name = styled.p`
  width: 85px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckBox = styled.label<{ checked: boolean }>`
  width: 15px;
  height: 15px;
  margin: 2.5px;
  border: 1.5px solid ${deepGray};
  border-radius: 2.5px;
  background: ${({ checked }) => (checked ? `${deepBlue}` : 'white')};
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  border: 0;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
`;

const Check = styled(AiOutlineCheck)``;

export default UserBarCheck;
