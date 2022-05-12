import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const UserModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

export const Container = styled.div`
  position: fixed;
  max-width: 600px;
  top: 15%;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 4em 2rem;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
`;

export const Close = styled.button`
  background-color: #fff;
  border: 0;
  color: #fff;
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  padding: 4px 15px;
  border-radius: 5px;
  font-size: 1.5rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #3f51b5;
  border-radius: 10px;
`;

export const CepInput = styled(InputMask)`
  padding: 0.5rem 1rem;
  border: 1px solid #3f51b5;
  border-radius: 10px;
`;

export const Register = styled.button`
  padding: 0.5rem 0;
  border: none;
  border-radius: 15px;
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #fff;
  background-color: #4d5bf9;
  transition: all 0.3s;
  &:hover {
    background-color: blue;
  }
`;