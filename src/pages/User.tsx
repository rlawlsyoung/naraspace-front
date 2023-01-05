import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarSelect from '../components/UserBarSelect';
import UserInfo from '../components/UserInfo';

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

  if (location.pathname === '/user')
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
          <UserInfo
            id={selectedUser.id}
            image={'/images/' + suitableImg(selectedUser.image)}
            name={selectedUser.name}
            date={selectedUser.date}
            comment={selectedUser.comment}
            width="350px"
          />
        )}
      </Container>
    );
  else
    return (
      <Container className="flex-center">
        <UserInfo
          id={selectedUser.id}
          image={'/images/' + suitableImg(selectedUser.image)}
          name={selectedUser.name}
          date={selectedUser.date}
          comment={selectedUser.comment}
          width="350px"
        />
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

export default User;
