import styled from 'styled-components';
import React from 'react';

const BoxContainer = styled.div`
  display: flex;  
`;
const ExperimentContainer = styled.div`
  margin: 0 3em;
`;

const renderComponents = (component, times) => {
  const components = [];
  for (let i = 0; i < times; i++) {
    components.push(<div key={i}>{component}</div>);
  }
  return components;
};

export function BoxMatrix({ title, component, times }) {

  return <ExperimentContainer>
    <h2>{title}</h2>
    <BoxContainer>
      {renderComponents(component, times)}
    </BoxContainer>
  </ExperimentContainer>;
}