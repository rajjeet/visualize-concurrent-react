import styled from 'styled-components';

export const StyledBox = styled.div`
  background-color: ${props => props.color};
  border: 3px solid darkslategray;
  height: 30px;
  width: 30px;
  margin: .2em;
`;