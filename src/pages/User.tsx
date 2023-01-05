import styled from 'styled-components';
import ContainerHeader from '../components/ContainerHeader';

const User = () => {
  const handleChange = () => {};

  return (
    <Container className="flex-center">
      <ContainerHeader handleChange={handleChange} />
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 70px);
  margin-top: 70px;
`;

export default User;
