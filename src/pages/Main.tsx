import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarCheck from '../components/UserBarCheck';
import UserBar from '../components/UserBar';
import { deepGray, deepBlue, lightGray } from '../styles/theme';

export interface userDataType {
  id: number;
  image: string;
  name: string;
  date: string;
  comment: string;
  checked: boolean;
}

const Main = () => {
  const [userData, setUserData] = useState([
    { id: 0, name: '', date: '', checked: false, image: '', comment: '' },
  ]);

  const checkedUserData = userData.filter((data) => data.checked);

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
        <UserBarCheckWrapper>
          {userData.map((data) => {
            const handleChange = () => {
              const clickedIdx = userData.indexOf(data);
              const newUserData = [...userData];
              [...userData][clickedIdx].checked = !userData[clickedIdx].checked;
              setUserData(newUserData);
            };
            return (
              <UserBarCheck
                key={data.id}
                handleChange={handleChange}
                name={data.name}
                date={data.date}
                checked={data.checked}
              />
            );
          })}
        </UserBarCheckWrapper>
      </LeftContainer>

      <FaArrowRight size={40} className="arrow" />

      <RightContainer>
        <ContainerHeader />
        <UserBarCheckWrapper>
          {checkedUserData.map((data) => (
            <UserBar
              key={data.id}
              // userData={userData}
              name={data.name}
              date={data.date}
              checked={data.checked}
            />
          ))}
          <ButtonContainer className="flex-center">
            <SaveButton>저장하기</SaveButton>
          </ButtonContainer>
        </UserBarCheckWrapper>
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

const UserBarCheckWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 400px;
  background-color: white;
  overflow-y: auto;

  &::-webkit-scrollbar {
    position: fixed;
    left: 0;
    width: 5px;
    padding-left: 100px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2.5px;
    background-color: ${deepGray};
  }

  &::-webkit-scrollbar-track {
    border-radius: 2.5px;
    background-color: ${lightGray};
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
