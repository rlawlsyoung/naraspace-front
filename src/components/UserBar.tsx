import styled from 'styled-components';

import { deepGray } from '../styles/theme';

const UserBar = () => {
  return (
    <Container>
      <Wrapper>
        <Name>뽀로로</Name>
        <p>1999.08.26</p>
      </Wrapper>
      <CheckBox type="checkbox" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 10px 0;
  margin: 0 20px;
  border-bottom: 1px solid ${deepGray};
`;

const Wrapper = styled.div`
  display: flex;
`;

const Name = styled.p`
  width: 95px;
`;

const CheckBox = styled.input``;

export default UserBar;
