import styled from 'styled-components';
import Logo from './Logo';
import PageButton from './PageButton';

import { deepSkyBlue, mobile } from '../styles/theme';

const Header = () => {
  return (
    <Container>
      <Logo />
      <ButtonWrapper className="flex-center">
        <PageButton text="PAGE 01" goal="/" />
        <PageButton text="PAGE 02" goal="/user" />
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${deepSkyBlue};
`;

const ButtonWrapper = styled.div`
  margin: 0 40px;

  @media ${mobile} {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    margin: 0;
  }
`;

export default Header;
