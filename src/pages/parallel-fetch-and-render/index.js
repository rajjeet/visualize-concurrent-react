import React from 'react';
import styled from 'styled-components';
import { FetchOnRenderBox } from './fetch-on-render-box';
import { FetchThenRenderBox } from './fetch-then-render-box';
import { FetchAsYouRenderBox } from './fetch-as-you-render-box';
import { BoxMatrix } from '../../components/box-matrix';

export const ComparisonContainer = styled.div`
  display: flex;  
  justify-content: center;   
`;

export const ExperimentContainer = styled.div`
  margin: 0 2em;
  min-width: 200px; 
`;

export const ParallelFetchAndRender = () => {
  return (
    <div>
      <h1>Parallel Fetch & Render</h1>
      <ComparisonContainer>
        <ExperimentContainer>
          <h2>Fetch-On-Render</h2>
          <BoxMatrix times={5}
                     component={<FetchOnRenderBox index={10} />}
          />
        </ExperimentContainer>
        <ExperimentContainer>
          <h2>Fetch-Then-Render</h2>
          <BoxMatrix times={5}
                     component={<FetchThenRenderBox index={10} />}
          />
        </ExperimentContainer>
        <ExperimentContainer>
          <h2>Fetch-As-You-Render</h2>
          <BoxMatrix times={5}
                     component={<FetchAsYouRenderBox index={10} />}
          />
        </ExperimentContainer>
      </ComparisonContainer>
    </div>
  );
};