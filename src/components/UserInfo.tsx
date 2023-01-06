import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineRight, AiOutlineLeft, AiTwotoneEdit } from 'react-icons/ai';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';
import Alert from './Alert';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [imageValue, setImageValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  const suitableImg = useCallback((str: string) => {
    if (str) return str;
    else return '0.png';
  }, []);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  }, []);
  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
  }, []);
  const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value);
  }, []);

  const handleLeftImage = useCallback(() => {
    if (parseInt(imageValue) - 1 > 0) setImageValue(parseInt(imageValue) - 1 + '.png');
    else if (imageValue === '') setImageValue('14.png');
    else setImageValue('');
  }, [imageValue]);

  const handleRightImage = useCallback(() => {
    if (parseInt(imageValue) + 1 <= 14) setImageValue(parseInt(imageValue) + 1 + '.png');
    else if (imageValue === '') setImageValue('1.png');
    else setImageValue('');
  }, [imageValue]);

  const handleDialogClose = useCallback(() => setIsDialogOpen(false), []);

  const nameRegExp = RegExp(/^[가-힣a-zA-Z\s]+$/);
  const dateRegExp = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);

  const handleEdit = () => {
    if (!isEditing) {
      setNameValue(name);
      setDateValue(date);
      setCommentValue(comment);
      setImageValue(image);
      setIsEditing(!isEditing);
    } else {
      if (nameRegExp.test(nameValue) && dateRegExp.test(dateValue)) {
        axios
          .put(`http://localhost:9000/user/${id}`, {
            image: imageValue,
            name: nameValue,
            date: dateValue,
            comment: commentValue,
            checked: checked,
          })
          .then(() => {
            setDetailUser!({
              id: id,
              image: imageValue,
              name: nameValue,
              date: dateValue,
              comment: commentValue,
              checked: checked,
            });
            setIsEditing(!isEditing);
          });
      } else {
        setIsDialogOpen(true);
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
      {isEditing && (
        <ArrowWrapper isDetail={true}>
          <Button onClick={handleLeftImage}>
            <MdArrowBackIosNew />
          </Button>
          <Button onClick={handleRightImage}>
            <MdArrowForwardIos />
          </Button>
        </ArrowWrapper>
      )}
      <ProfileImage
        isDetail={true}
        src={isEditing ? '/images/' + suitableImg(imageValue) : '/images/' + suitableImg(image)}
        alt="프로필 이미지"
      />
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
      {isEditing && (
        <EditGuide className="flex-center">
          이름은 한글 또는 영어로 1 ~ 10자, <br /> 생년월일은 숫자 사이에 미들바(-)를 작성해주세요.
        </EditGuide>
      )}
      <Alert
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleDialogClose}
        title="조건 불충족"
        text="명시되어있는 조건에 맞는 값을 입력해주세요."
      />
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

const ArrowWrapper = styled.div<{ isDetail: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 100px;
  left: ${(props) => (props.isDetail ? '135px' : '85px')};
  width: 350px;
  font-size: 60px;

  @media ${mobile} {
    top: 70px;
    left: calc(45vw - 125px);
    width: 250px;
  }
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  color: ${deepBlue};
  font-size: 60px;
  cursor: pointer;
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

const EditGuide = styled.div`
  height: 50px;
  background-color: white;
  padding: 20px 20px 40px 20px;
  color: #5c5c5c;
  font-weight: 600;
  text-align: center;
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
