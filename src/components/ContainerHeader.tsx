import React, { useState } from 'react';
import styled from 'styled-components';

import { deepBlue, lightSkyBlue, middleBlue, mobile } from '../styles/theme';

interface ContainerHeaderType {
  isShowOptions: boolean;
  setIsShowOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAsc: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContainerHeader: React.FC<ContainerHeaderType> = ({
  isShowOptions,
  setIsShowOptions,
  setIsAsc,
}) => {
  const [currentValue, setCurrentValue] = useState('오름차 순');

  const handleOnChangeSelectValue = (str: string) => {
    setCurrentValue(str);
    str === '오름차 순' && setIsAsc(true);
    str === '내림차 순' && setIsAsc(false);
  };

  return (
    <Container>
      <SelectBox onClick={() => setIsShowOptions(!isShowOptions)} show={isShowOptions}>
        <Label>{currentValue}</Label>
        <SelectOptions show={isShowOptions}>
          <Option
            className="flex-center"
            onClick={() => handleOnChangeSelectValue('오름차 순')}
            currentValue={currentValue}
            value="오름차 순"
          >
            오름차 순
          </Option>
          <Option
            className="flex-center"
            onClick={() => handleOnChangeSelectValue('내림차 순')}
            currentValue={currentValue}
            value="내림차 순"
          >
            내림차 순
          </Option>
        </SelectOptions>
      </SelectBox>
      <Wrapper>
        <Box>이름</Box>
        <Box>생년월일</Box>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: ${lightSkyBlue};

  @media ${mobile} {
    position: relative;
    padding: 16px 20px;
  }
`;

const SelectBox = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 80px;
  height: 30px;
  margin-top: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: ${(props) => (props.show ? 'none' : '5px')};
  border-bottom-right-radius: ${(props) => (props.show ? 'none' : '5px')};
  background-color: white;
  cursor: pointer;

  &::before {
    content: '⌵';
    position: absolute;
    top: 1px;
    right: 5px;
    color: black;
    font-size: 20px;
  }

  @media ${mobile} {
    position: absolute;
    right: 20px;
    bottom: 8px;
    margin: 0;
  }
`;
const Label = styled.label`
  font-size: 14px;
  margin-left: 4px;
  text-align: center;
`;

const SelectOptions = styled.ul<{ show: boolean }>`
  position: absolute;
  list-style: none;
  top: 30px;
  left: 0;
  width: 100%;
  overflow: hidden;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  padding: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0px 3px 4px -2px gray;
  background-color: white;
  z-index: 0;
  cursor: pointer;
`;

const Option = styled.li<{ currentValue: string; value: string }>`
  padding: 8px 8px;
  color: ${(props) => props.currentValue === props.value && deepBlue};
  background-color: ${(props) => (props.currentValue === props.value ? middleBlue : 'white')};

  &:hover {
    background-color: ${middleBlue};
    transition: background-color 0.2s ease-in;
    color: ${deepBlue};
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  margin-top: 16px;
  width: 85px;

  @media ${mobile} {
    margin: 0;
  }
`;

export default ContainerHeader;
