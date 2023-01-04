import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { deepBlue, lightSkyBlue } from '../styles/theme';

const NotFound = () => {
  return (
    <Container className="flex-center">
      잘못된 접근입니다.
      <Link to="/">메인으로 돌아가기</Link>
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
  height: calc(100vh - 70px);
  margin-top: 70px;
  font-size: 24px;
  font-weight: 700;

  a {
    padding: 15px;
    margin-top: 25px;
    background-color: ${lightSkyBlue};
    color: white;
    font-size: 20px;
    font-weight: 400;

    &:hover {
      background-color: ${deepBlue};
      font-weight: 700;
      transition: 0.3s;
    }
  }
`;

export default NotFound;
