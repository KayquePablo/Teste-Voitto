import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    font-size: 1rem;
  }
  li + li {
    margin-top: 1.5rem;
  }
`;