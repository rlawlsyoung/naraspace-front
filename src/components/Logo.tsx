import styled from 'styled-components';
import logo from '../assets/images/logo.png';

const Logo = () => {
  return <Container src={logo} />;
};

const Container = styled.img`
  margin: 0 40px;
`;

export default Logo;
