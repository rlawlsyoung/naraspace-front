import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBarWrapper from '../components/UserBarWrapper';
import UserBarSelect from '../components/UserBarSelect';

import { userDataType } from './Main';
import { lightSkyBlue, lightGray, deepGray, deepBlue, mobile } from '../styles/theme';

const User = () => {
  const navigate = useNavigate();
  const [isShowOptions, setIsShowOptions] = useState(false);
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

  const [isAsc, setIsAsc] = useState(true);

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
        location.pathname === '/user' && setIsAsc(true);
      });
    } catch (err) {
      console.log('데이터를 받아오는 과정에서 오류가 발생했습니다.', err);
    }
  }, [location.pathname]);

  useEffect(() => {
    const reversedUserData = userDataSort([...checkedUserData], isAsc);
    setCheckedUserData(reversedUserData);
  }, [isAsc]);

  const suitableImg = useCallback((str: string) => {
    if (str) return str;
    else return '0.png';
  }, []);

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

  return location.pathname === '/user' ? (
    <Container className="flex-center" onClick={handleClickOutside}>
      <LeftContainer>
        <ContainerHeader
          isShowOptions={isShowOptions}
          setIsShowOptions={setIsShowOptions}
          setIsAsc={setIsAsc}
        />
        <UserBarWrapper height="320px">
          {checkedUserData[0].id !== 0 &&
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
        <RightContainer url={location.pathname} width="350px">
          <DetailLink to={'/user/' + selectedUser.id} className="flex-center">
            자세히 보기
            <AiOutlineRight />
          </DetailLink>
          <ContainerTop />
          <ProfileImage
            isDetail={false}
            src={'/images/' + suitableImg(selectedUser.image)}
            alt="프로필 이미지"
          />
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
  ) : (
    <Container className="flex-center">
      <RightContainer url={location.pathname} width="620px">
        <PreviousLink onClick={() => navigate(-1)} className="flex-center">
          <AiOutlineLeft />
          뒤로 가기
        </PreviousLink>
        <ContainerTop />
        <ProfileImage
          isDetail={true}
          src={'/images/' + suitableImg(detailUser.image)}
          alt="프로필 이미지"
        />
        <ContainerBottom className="flex-center">
          <InfoBar>
            <Name>이름</Name>
            <p>{detailUser.name}</p>
          </InfoBar>
          <InfoBar>
            <Name>생년월일</Name>
            <p>{detailUser.date}</p>
          </InfoBar>
          <InfoBar>
            <Name>한마디</Name>
            <p>{detailUser.comment}</p>
          </InfoBar>
        </ContainerBottom>
      </RightContainer>
    </Container>
  );
};

interface RightContainerStyleProps {
  url: string;
  width: string;
}

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

const RightContainer = styled.div<RightContainerStyleProps>`
  position: relative;
  width: ${(props) => props.width};
  margin-left: ${(props) => props.url === '/user' && '20px'};

  @media ${mobile} {
    width: 90vw;
    margin-left: 0;
  }
`;

const DetailLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: ${deepBlue};
`;

const PreviousLink = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 16px;
  color: ${deepBlue};
  cursor: pointer;
`;

const ContainerTop = styled.div`
  height: 160px;
  background-color: ${lightSkyBlue};

  @media ${mobile} {
    height: 120px;
  }
`;

const ProfileImage = styled.img<{ isDetail: boolean }>`
  position: absolute;
  top: 40px;
  left: ${(props) => (props.isDetail ? '220px' : '85px')};
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: white;
  box-shadow: 0px 2px 6px 1.5px ${deepGray};

  @media ${mobile} {
    top: 40px;
    left: calc(45vw - 60px);
    width: 120px;
    height: 120px;
  }
`;

const ContainerBottom = styled.div`
  flex-direction: column;
  height: 250px;
  padding-top: 50px;
  background-color: white;

  @media ${mobile} {
    height: 25vh;
    padding-top: 30px;
  }
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
