import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBar from '../components/UserBar';
import { deepGray, deepBlue } from '../styles/theme';

const Main = () => {
  const [userData, setUserData] = useState([{ name: '', date: '', checked: false }]);

  useEffect(() => {
    axios('/data/user-data.json').then((res) => {
      setUserData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Container className="flex-center">
      <LeftContainer>
        <ContainerHeader />
        <UserBarWrapper>
          {userData.map((data) => (
            <UserBar name={data.name} date={data.date} />
          ))}
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
  font-size: 14px;

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
  height: 400px;
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    height: 3px;
    border-radius: 10px;
    background: ${deepGray};
  }
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
