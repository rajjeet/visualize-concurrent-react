import React from 'react';
import styled from 'styled-components';
import { FetchOnRenderBox } from './fetch-on-render-box';
import { FetchThenRenderBox } from './fetch-then-render-box';
import { FetchAsYouRenderBox } from './fetch-as-you-render-box';

const BoxContainer = styled.div`
  display: flex;  
`;

const ComparisonContainer = styled.div`
  display: flex;  
  justify-content: center;    
`;

const ExperimentContainer = styled.div`
  margin: 0 3em;
`;


function RenderExperiment({ title, component }) {
  return <ExperimentContainer>
    <h2>{title}</h2>
    <BoxContainer>
      {component}
      {component}
      {component}
      {component}
      {component}
    </BoxContainer>
  </ExperimentContainer>;
}

export const ParallelFetchAndRender = () => {
  return (
    <div>
      <h1>Parallel Fetch & Render</h1>
      <ComparisonContainer>
        <RenderExperiment title={"Fetch-On-Render"}
                          component={<FetchOnRenderBox index={10} />} />
        <RenderExperiment title={"Fetch-Then-Render"}
                          component={<FetchThenRenderBox index={10} />} />
        <RenderExperiment title={"Fetch-As-You-Render"}
                          component={<FetchAsYouRenderBox index={10} />} />
      </ComparisonContainer>
    </div>
  );
};