import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineRight, AiOutlineLeft, AiTwotoneEdit } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { userDataType } from '../pages/Main';
import { lightSkyBlue, lightGray, deepGray, deepBlue, mobile } from '../styles/theme';

interface UserInfoType {
  id: number;
  image: string;
  name: string;
  date: string;
  comment: string;
  checked: boolean;
  isExistUser: boolean;
  setDetailUser?: React.Dispatch<React.SetStateAction<userDataType>>;
}

const UserInfo: React.FC<UserInfoType> = ({
  id,
  image,
  name,
  date,
  comment,
  checked,
  isExistUser,
  setDetailUser,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  const suitableImg = useCallback((str: string) => {
    if (str) return str;
    else return '0.png';
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  };
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  };
  const nameRegExp = RegExp(/^[가-힣a-zA-Z\s]+$/);
  const dateRegExp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

  const handleEdit = () => {
    if (!isEditing) {
      setNameValue(name);
      setDateValue(date);
      setCommentValue(comment);
      setIsEditing(!isEditing);
    } else {
      if (nameRegExp.test(nameValue) && dateRegExp.test(dateValue)) {
        axios
          .put(`http://localhost:9000/user/${id}`, {
            image: image,
            name: nameValue,
            date: dateValue,
            comment: commentValue,
            checked: checked,
          })
          .then(() => {
            setDetailUser!({
              id: id,
              image: image,
              name: nameValue,
              date: dateValue,
              comment: commentValue,
              checked: checked,
            });
            setIsEditing(!isEditing);
          });
      } else {
        alert('조건 불충족');
      }
    }
  };

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
      {isExistUser && (
        <Edit className="flex-center" onClick={handleEdit}>
          {isEditing ? (
            <>
              <FaCheckCircle />
              <p>완료</p>
            </>
          ) : (
            <>
              <AiTwotoneEdit /> <p>프로필 수정</p>
            </>
          )}
        </Edit>
      )}
      <ContainerTop />
      <ProfileImage isDetail={true} src={'/images/' + suitableImg(image)} alt="프로필 이미지" />
      <ContainerBottom className="flex-center">
        {isEditing ? (
          <>
            <InfoBar>
              <Name>이름</Name>
              <EditInput type="text" value={nameValue} onChange={handleNameChange} maxLength={10} />
            </InfoBar>
            <InfoBar>
              <Name>생년월일</Name>
              <EditInput value={dateValue} onChange={handleDateChange} maxLength={10} />
            </InfoBar>
            <InfoBar>
              <Name>한마디</Name>
              <EditInput value={commentValue} onChange={handleCommentChange} maxLength={42} />
            </InfoBar>
          </>
        ) : (
          <>
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
          </>
        )}
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
  padding-top: 30px;
  background-color: white;

  @media ${mobile} {
    height: 25vh;
    padding-top: 30px;
  }
`;

const Edit = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #5c5c5c;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  p {
    margin-left: 5px;
  }

  &:hover {
    color: black;
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

const EditInput = styled.input`
  border: none;
  background-color: ${lightSkyBlue};
  font-family: 'SUIT-Variable', sans-serif;
  font-size: 14px;
  outline: none;
`;

export default UserInfo;
