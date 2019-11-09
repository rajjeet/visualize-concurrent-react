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

export const ParallelFetchAndRender = () => {
  return (
    <div>
      <h1>Parallel Fetch & Render</h1>
      <ComparisonContainer>
        <BoxMatrix title={"Fetch-On-Render"}
                   times={5}
                   component={<FetchOnRenderBox index={10} />}
        />
        <BoxMatrix title={"Fetch-Then-Render"}
                   times={5}
                   component={<FetchThenRenderBox index={10} />}
        />
        <BoxMatrix title={"Fetch-As-You-Render"}
                   times={5}
                   component={<FetchAsYouRenderBox index={10} />}
        />
      </ComparisonContainer>
    </div>
  );
};