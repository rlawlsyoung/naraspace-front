import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';
import UserBar from '../components/UserBar';

import { deepGray } from '../styles/theme';

const Main = () => {
  return (
    <Container className="flex-center">
      <LeftContainer>
        <ContainerHeader />
        <UserBar />
      </LeftContainer>

      <FaArrowRight size={40} className="arrow" />

      <RightContainer>
        <ContainerHeader />
      </RightContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  color: ${deepGray};
  font-size: 15px;
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
  width: 250px;
  color: black;
`;

export default Main;
