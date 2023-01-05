import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import UserBarCheck from '../components/UserBarCheck';
import UserBar from '../components/UserBar';
import { deepGray, deepBlue, lightGray, lightSkyBlue } from '../styles/theme';

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
  const [checkedUserData, setCheckedUserData] = useState([
    {
      id: 0,
      name: '',
      date: '',
      checked: false,
      image: '',
      comment: '',
    },
  ]);
  const [isLeftAsc, setIsLeftAsc] = useState(true);
  const [isRightAsc, setIsLRightAsc] = useState(true);
  const [toggle, setToggle] = useState(false);

  const handleLeftChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reversedUserData = [...userData].reverse();
    setUserData(reversedUserData);
  };

  const handleRightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const reversedUserData = [...checkedUserData].reverse();
    setCheckedUserData(reversedUserData);
  };

  const userDataSort = useCallback((data: userDataType[]) => {
    const newData = [...data];
    newData.sort((a, b) => {
      let x = a.name.toLowerCase();
      let y = b.name.toLowerCase();
      if (a.date !== b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (x < y) {
        return -1;
      } else if (x > y) {
        return 1;
      }
      return 0;
    });
    return newData;
  }, []);

  useEffect(() => {
    axios('/data/user-data.json').then((res) => {
      res.data && setUserData(userDataSort(res.data));
      setToggle(!toggle);
    });
  }, []);

  useEffect(() => {
    userData[0].id !== 0 &&
      setCheckedUserData(userData.filter((data: userDataType) => data.checked));
  }, [userData && toggle]);

  return (
    <Container className="flex-center">
      <LeftContainer>
        <ContainerHeader>
          <SelectBox name="정렬" onChange={handleLeftChange}>
            <option value="오름차 순">오름차 순</option>
            <option value="내림차 순">내림차 순</option>
          </SelectBox>
          <InfoWrapper>
            <Info>이름</Info>
            <Info>생년월일</Info>
          </InfoWrapper>
        </ContainerHeader>
        <UserBarCheckWrapper height="400px">
          {userData[0].id !== 0 &&
            userData.map((data) => {
              const handleChange = () => {
                const clickedIdx = userData.indexOf(data);
                const newUserData = [...userData];
                [...userData][clickedIdx].checked = !userData[clickedIdx].checked;
                setUserData(newUserData);
                setToggle(!toggle);
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
        <ContainerHeader>
          <SelectBox name="정렬" onChange={handleRightChange}>
            <option value="오름차 순">오름차 순</option>
            <option value="내림차 순">내림차 순</option>
          </SelectBox>
          <InfoWrapper>
            <Info>이름</Info>
            <Info>생년월일</Info>
          </InfoWrapper>
        </ContainerHeader>
        <UserBarCheckWrapper height="320px">
          {checkedUserData.map((data) => (
            <UserBar key={data.id} name={data.name} date={data.date} />
          ))}
        </UserBarCheckWrapper>
        <ButtonContainer className="flex-center">
          <SaveButton>저장하기</SaveButton>
        </ButtonContainer>
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

const ContainerHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  background-color: ${lightSkyBlue};
  font-weight: 600;
`;

const SelectBox = styled.select`
  width: 80px;
  height: 30px;
  margin-top: 10px;
  font-family: 'SUIT-Variable', sans-serif;
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const Info = styled.div`
  margin-top: 16px;
  width: 85px;
`;

const UserBarCheckWrapper = styled.div<{ height: string }>`
  display: flex;
  flex-direction: column;
  height: ${(props) => props.height};
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

const ButtonContainer = styled.div`
  background-color: white;
`;

const SaveButton = styled.button`
  height: 35px;
  width: 210px;
  margin: 22.5px 20px;
  border: none;
  background-color: ${deepBlue};
  color: white;
  font-family: 'SUIT-Variable', sans-serif;
  cursor: pointer;
`;

export default Main;
