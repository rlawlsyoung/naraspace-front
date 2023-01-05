import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarCheck from '../components/UserBarCheck';
import UserBar from '../components/UserBar';
import { deepGray, deepBlue } from '../styles/theme';

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

  useEffect(() => {
    axios('/data/user-data.json').then((res) => {
      res.data && setUserData(userDataSort(res.data, isLeftAsc));
      setToggle(!toggle);
    });
  }, []);

  useEffect(() => {
    userData[0].id !== 0 &&
      setCheckedUserData(
        userDataSort(
          userData.filter((data: userDataType) => data.checked),
          isRightAsc,
        ),
      );
  }, [userData && toggle]);

  useEffect(() => {
    const reversedUserData = userDataSort([...userData], isLeftAsc);
    setUserData(reversedUserData);
  }, [isLeftAsc]);

  useEffect(() => {
    const reversedUserData = userDataSort([...checkedUserData], isRightAsc);
    setCheckedUserData(reversedUserData);
  }, [isRightAsc]);

  const handleLeftChange = () => {
    setIsLeftAsc(!isLeftAsc);
  };

  const handleRightChange = () => {
    setIsLRightAsc(!isRightAsc);
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
        <ContainerHeader handleChange={handleLeftChange} />
        <UserBarWrapper height="400px">
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
        </UserBarWrapper>
      </LeftContainer>
      <FaArrowRight size={40} className="arrow" />
      <RightContainer>
        <ContainerHeader handleChange={handleRightChange} />
        <UserBarWrapper height="320px">
          {checkedUserData.map((data) => (
            <UserBar key={data.id} name={data.name} date={data.date} />
          ))}
        </UserBarWrapper>
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
