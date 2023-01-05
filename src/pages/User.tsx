import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarSelect from '../components/UserBarSelect';

import { userDataType } from './Main';
import { lightSkyBlue, lightGray, deepGray } from '../styles/theme';

const User = () => {
  const [selectedUser, setSelectedUser] = useState({
    id: 0,
    name: '',
    date: '',
    checked: false,
    image: '',
    comment: '',
  });
  const [userData, setUserData] = useState([
    { id: 0, name: '', date: '', checked: false, image: '', comment: '' },
  ]);
  const [isAsc, setIsAsc] = useState(true);

  useEffect(() => {
    axios('/data/user-data.json').then((res) => {
      res.data &&
        setUserData(
          userDataSort(
            res.data.filter((data: userDataType) => data.checked),
            isAsc,
          ),
        );
    });
  }, []);

  useEffect(() => {
    const reversedUserData = userDataSort([...userData], isAsc);
    setUserData(reversedUserData);
  }, [isAsc]);

  const suitableImg = (str: string) => {
    if (str) return str;
    else return '0.png';
  };

  const handleChange = () => {
    setIsAsc(!isAsc);
  };

  const userDataSort = useCallback((data: userDataType[], isAsc: boolean) => {
    const newData = [...data];
    if (isAsc) {
      newData.sort((a, b) => {
        if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
        else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      return newData;
    } else {
      newData.sort((a, b) => {
        if (a.date !== b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
        else if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      return newData;
    }
  }, []);

  return (
    <Container className="flex-center">
      <LeftContainer>
        <ContainerHeader handleChange={handleChange} />
        <UserBarWrapper height="320px">
          {userData[0].id !== 0 &&
            userData.map((data) => {
              const handleClick = () => {
                setSelectedUser(data);
              };
              return (
                <UserBarSelect
                  key={data.id}
                  id={data.id}
                  selectedId={selectedUser.id}
                  name={data.name}
                  date={data.date}
                  handleClick={handleClick}
                />
              );
            })}
        </UserBarWrapper>
      </LeftContainer>
      {selectedUser.id !== 0 && (
        <RightContainer>
          <ContainerTop />
          <ProfileImage src={'/images/' + suitableImg(selectedUser.image)} alt="프로필 이미지" />
          <ContainerBottom className="flex-center">
            <InfoBar>
              <Name>이름</Name>
              <p>{selectedUser.name}</p>
            </InfoBar>
            <InfoBar>
              <Name>생년월일</Name>
              <p>{selectedUser.date}</p>
            </InfoBar>
            <InfoBar>
              <Name>한마디</Name>
              <p>{selectedUser.comment}</p>
            </InfoBar>
          </ContainerBottom>
        </RightContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 70px);
  margin-top: 70px;
  font-size: 14px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  color: black;
`;

const RightContainer = styled.div`
  position: relative;
  width: 350px;
  margin-left: 20px;
`;

const ContainerTop = styled.div`
  height: 160px;
  background-color: ${lightSkyBlue};
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 40px;
  left: 85px;
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: white;
  box-shadow: 0px 2px 6px 1.5px ${deepGray};
`;

const ContainerBottom = styled.div`
  flex-direction: column;
  height: 250px;
  padding-top: 50px;
  background-color: white;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  border-bottom: 1px solid ${lightGray};

  &:last-of-type {
    border: none;
  }
`;

const Name = styled.p`
  font-weight: 700;
  min-width: 85px;
`;

export default User;
