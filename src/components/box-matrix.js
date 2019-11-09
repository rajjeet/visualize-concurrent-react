import styled from 'styled-components';
import React from 'react';

const BoxContainer = styled.div`
  display: flex;  
`;

const renderComponents = (component, times) => {
  const components = [];
  for (let i = 0; i < times; i++) {
    components.push(<div key={i}>{component}</div>);
  }
  return components;
};

export function BoxMatrix({ component, times }) {

  return <BoxContainer>
      {renderComponents(component, times)}
    </BoxContainer>

}