import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import styled from 'styled-components';

interface AlertType {
  isDialogOpen: boolean;
  handleDialogClose: () => void;
  title: string;
  text: string;
}

const Alert: React.FC<AlertType> = ({ isDialogOpen, handleDialogClose, title, text }) => {
  return (
    <Container
      open={isDialogOpen}
      onClose={handleDialogClose}
      PaperProps={{
        style: { borderRadius: 0 },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary" autoFocus>
          닫기
        </Button>
      </DialogActions>
    </Container>
  );
};

const Container = styled(Dialog)`
  overflow: hidden;
  font-family: 'SUIT-Variable', sans-serif;
`;
export default Alert;
