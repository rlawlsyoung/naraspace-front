import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import styled from 'styled-components';

import { lightSkyBlue, lightGray, deepGray, deepBlue, mobile } from '../styles/theme';

interface UserInfoType {
  id: number;
  image: string;
  name: string;
  date: string;
  comment: string;
}

const UserInfo: React.FC<UserInfoType> = ({ id, image, name, date, comment }) => {
  const suitableImg = useCallback((str: string) => {
    if (str) return str;
    else return '0.png';
  }, []);

  return location.pathname === '/user' ? (
    <Container url={location.pathname} width="350px">
      <DetailLink to={'/user/' + id} className="flex-center">
        자세히 보기
        <AiOutlineRight />
      </DetailLink>
      <ContainerTop />
      <ProfileImage isDetail={false} src={'/images/' + suitableImg(image)} alt="프로필 이미지" />
      <ContainerBottom className="flex-center">
        <InfoBar>
          <Name>이름</Name>
          <p>{name}</p>
        </InfoBar>
        <InfoBar>
          <Name>생년월일</Name>
          <p>{date}</p>
        </InfoBar>
        <InfoBar>
          <Name>한마디</Name>
          <p>{comment}</p>
        </InfoBar>
      </ContainerBottom>
    </Container>
  ) : (
    <Container url={location.pathname} width="620px">
      <PreviousLink to="/user" className="flex-center">
        <AiOutlineLeft />
        뒤로 가기
      </PreviousLink>
      <ContainerTop />
      <ProfileImage isDetail={true} src={'/images/' + suitableImg(image)} alt="프로필 이미지" />
      <ContainerBottom className="flex-center">
        <InfoBar>
          <Name>이름</Name>
          <p>{name}</p>
        </InfoBar>
        <InfoBar>
          <Name>생년월일</Name>
          <p>{date}</p>
        </InfoBar>
        <InfoBar>
          <Name>한마디</Name>
          <p>{comment}</p>
        </InfoBar>
      </ContainerBottom>
    </Container>
  );
};

interface ContainerStyleProps {
  url: string;
  width: string;
}

const Container = styled.div<ContainerStyleProps>`
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

const PreviousLink = styled(Link)`
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

export default UserInfo;
