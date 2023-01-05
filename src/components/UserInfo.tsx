import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';

import { lightSkyBlue, deepGray, lightGray, deepBlue } from '../styles/theme';

interface UserInfoType {
  id: number;
  image: string;
  name: string;
  date: string;
  comment: string;
  width: string;
}

const UserInfo: React.FC<UserInfoType> = ({ id, image, name, date, comment, width }) => {
  const location = useLocation();

  return (
    <RightContainer url={location.pathname}>
      <DetailLink to={'/user/' + id} className="flex-center">
        자세히 보기
        <AiOutlineRight />
      </DetailLink>
      <ContainerTop />
      <ProfileImage src={image} alt="프로필 이미지" />
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
    </RightContainer>
  );
};

const RightContainer = styled.div<{ url: string }>`
  position: relative;
  width: 350px;
  margin-left: ${(props) => props.url === '/user' && '20px'};
`;

const DetailLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 16px;
  color: ${deepBlue};
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

export default UserInfo;
