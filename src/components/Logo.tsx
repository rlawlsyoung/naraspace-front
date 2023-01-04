import styled from 'styled-components';
import logo from '../assets/images/logo.png';

import { mobile } from '../styles/theme';

const Logo = () => {
  return <Container src={logo} alt="Nara Space Technology" />;
};

const Container = styled.img`
  margin: 0 40px;

  @media ${mobile} {
    margin: 0 20px;
  }
`;

export default Logo;
