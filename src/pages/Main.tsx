import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarCheck from '../components/UserBarCheck';
import UserBar from '../components/UserBar';
import Alert from '../components/Alert';
import { deepGray, deepBlue, mobile } from '../styles/theme';

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
  const [isRightAsc, setIsRightAsc] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShowOptionsLeft, setIsShowOptionsLeft] = useState(false);
  const [isShowOptionsRight, setIsShowOptionsRight] = useState(false);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    try {
      axios('../user-data.json').then((res) => {
        res.data && setUserData(userDataSort(res.data.user, isLeftAsc));
        setToggle(!toggle);
      });
    } catch (err) {
      console.log('데이터를 받아오는 과정에서 오류가 발생했습니다.', err);
    }
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

  const handleDialogClose = useCallback(() => setIsDialogOpen(false), []);

  const handleClickOutside = useCallback(() => {
    isShowOptionsLeft && setIsShowOptionsLeft(!isShowOptionsLeft);
    isShowOptionsRight && setIsShowOptionsRight(!isShowOptionsRight);
  }, [isShowOptionsLeft, isShowOptionsRight]);

  const handleSave = useCallback(() => {
    try {
      axios('../user-data.json').then((res) => {
        const result = userData.filter((item) => {
          return res.data.user.some(
            (other: userDataType) => other.id === item.id && other.checked !== item.checked,
          );
        });
        result.forEach((data) => {
          try {
            axios.put(`http://localhost:9000/user/${data.id}`, data).then(() => {
              setIsDialogOpen(true);
            });
          } catch (err) {
            console.log('데이터를 받아오는 과정에서 오류가 발생했습니다.', err);
          }
        });
      });
    } catch (err) {
      console.log('데이터를 받아오는 과정에서 오류가 발생했습니다.', err);
    }
  }, [userData]);

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
    <Container className="flex-center" onClick={handleClickOutside}>
      <LeftContainer>
        <ContainerHeader
          isShowOptions={isShowOptionsLeft}
          setIsShowOptions={setIsShowOptionsLeft}
          setIsAsc={setIsLeftAsc}
        />
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
      <FaArrowRight className="arrow" />
      <RightContainer>
        <ContainerHeader
          isShowOptions={isShowOptionsRight}
          setIsShowOptions={setIsShowOptionsRight}
          setIsAsc={setIsRightAsc}
        />
        <UserBarWrapper height="320px">
          {checkedUserData[0].id !== 0 &&
            checkedUserData.map((data) => (
              <UserBar key={data.id} name={data.name} date={data.date} />
            ))}
        </UserBarWrapper>
        <ButtonContainer className="flex-center">
          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </ButtonContainer>
      </RightContainer>
      <Alert
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
        title="저장 완료"
        text="user-data.json 파일에 저장되었습니다."
      />
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
    font-size: 40px;
  }

  @media ${mobile} {
    flex-direction: column;
    height: calc(100vh - 120px);
    margin-top: 120px;

    .arrow {
      font-size: 20px;
      transform: rotate(90deg);
      margin: 5px 0;
    }
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  color: black;

  @media ${mobile} {
    width: 90vw;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 250px;
  color: black;

  @media ${mobile} {
    width: 90vw;
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
