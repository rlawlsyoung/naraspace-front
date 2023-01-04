import styled from 'styled-components';

import { lightSkyBlue } from '../styles/theme';

const ContainerHeader = () => {
  return (
    <Container>
      <SelectBox name="정렬">
        <option value="오름차 순">오름차 순</option>
        <option value="내림차 순">내림차 순</option>
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
`;

const SelectBox = styled.select`
  width: 80px;
  height: 30px;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Box = styled.div`
  margin-top: 20px;
  width: 100px;
`;

export default ContainerHeader;
