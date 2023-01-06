import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarSelect from '../components/UserBarSelect';
import UserInfo from '../components/UserInfo';

import { userDataType } from './Main';
import { mobile } from '../styles/theme';

const User = () => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const [isExistUser, setIsExistUser] = useState(false);
  const [isAsc, setIsAsc] = useState(true);
  const [checkedUserData, setCheckedUserData] = useState([
    { id: 0, name: '', date: '', checked: false, image: '', comment: '' },
  ]);
  const [selectedUser, setSelectedUser] = useState({
    id: 0,
    name: '',
    date: '',
    checked: false,
    image: '',
    comment: '',
  });

  const [detailUser, setDetailUser] = useState({
    id: 0,
    name: '존재하지 않는 사용자입니다.',
    date: '',
    checked: false,
    image: '',
    comment: '',
  });

  useEffect(() => {
    try {
      axios('../user-data.json').then((res) => {
        res.data.user &&
          location.pathname === '/user' &&
          setCheckedUserData(
            userDataSort(
              res.data.user.filter((data: userDataType) => data.checked),
              true,
            ),
          );
        location.pathname !== '/user' &&
          res.data.user &&
          res.data.user[res.data.user.length - 1].id >= Number(location.pathname.substr(6)) &&
          0 < Number(location.pathname.substr(6)) &&
          setDetailUser(
            res.data.user.find(
              (data: userDataType) => data.id === Number(location.pathname.substr(6)),
            ),
          );
        res.data.user &&
          res.data.user[res.data.user.length - 1].id >= Number(location.pathname.substr(6)) &&
          0 < Number(location.pathname.substr(6)) &&
          setIsExistUser(true);
        location.pathname === '/user' && setIsAsc(true);
      });
    } catch (err) {
      console.log('데이터를 받아오는 과정에서 오류가 발생했습니다.', err);
    }
    location.pathname === '/user' &&
      setSelectedUser({
        id: 0,
        name: '',
        date: '',
        checked: false,
        image: '',
        comment: '',
      });
  }, [location.pathname]);

  useEffect(() => {
    const reversedUserData = userDataSort([...checkedUserData], isAsc);
    setCheckedUserData(reversedUserData);
  }, [isAsc]);

  const handleClickOutside = useCallback(() => {
    isShowOptions && setIsShowOptions(!isShowOptions);
  }, [isShowOptions]);

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
      <Container className="flex-center" onClick={handleClickOutside}>
        <LeftContainer>
          <ContainerHeader
            isShowOptions={isShowOptions}
            setIsShowOptions={setIsShowOptions}
            setIsAsc={setIsAsc}
          />
          <UserBarWrapper height="320px">
            {checkedUserData &&
              checkedUserData[0]?.id !== 0 &&
              checkedUserData.map((data) => {
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
            image={selectedUser.image}
            name={selectedUser.name}
            date={selectedUser.date}
            comment={selectedUser.comment}
            checked={selectedUser.checked}
            isExistUser={isExistUser}
          />
        )}
      </Container>
    );
  else
    return (
      <Container className="flex-center" onClick={handleClickOutside}>
        <UserInfo
          id={detailUser.id}
          image={detailUser.image}
          name={detailUser.name}
          date={detailUser.date}
          comment={detailUser.comment}
          checked={detailUser.checked}
          setDetailUser={setDetailUser}
          isExistUser={isExistUser}
        />
      </Container>
    );
};

const Container = styled.div`
  height: calc(100vh - 70px);
  margin-top: 70px;
  margin-top: 70px;
  font-size: 14px;

  @media ${mobile} {
    flex-direction: column-reverse;
    height: calc(100vh - 120px);
    margin-top: 120px;
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

export default User;
