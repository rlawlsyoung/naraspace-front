import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBar from '../components/UserBar';

import { deepGray, deepBlue } from '../styles/theme';

const Main = () => {
  return (
    <Container className="flex-center">
      <LeftContainer>
        <ContainerHeader />
        <UserBarWrapper>
          <UserBar />
          <UserBar />
          <UserBar />
          <UserBar />
        </UserBarWrapper>
      </LeftContainer>

      <FaArrowRight size={40} className="arrow" />

      <RightContainer>
        <ContainerHeader />
        <UserBarWrapper>
          <ButtonContainer className="flex-center">
            <SaveButton>저장하기</SaveButton>
          </ButtonContainer>
        </UserBarWrapper>
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 70px);
  margin-top: 70px;
  color: ${deepGray};
  font-size: 15px;

  .arrow {
    margin: 0 50px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  color: black;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 250px;
  color: black;
`;

const UserBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 395px;
  background-color: white;
  overflow-y: auto;
`;

const ButtonContainer = styled.div``;

const SaveButton = styled.button`
  position: absolute;
  bottom: 0;
  height: 35px;
  width: 210px;
  margin: 25px 20px;
  border: none;
  background-color: ${deepBlue};
  color: white;
  font-family: 'SUIT-Variable', sans-serif;
  cursor: pointer;
`;

export default Main;
