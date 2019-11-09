import React, { Suspense, useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BoxMatrix } from '../../components/box-matrix';
import { FetchOnRenderBox } from '../parallel-fetch-and-render/fetch-on-render-box';
import { withRouter } from 'react-router-dom';
import dogImg from './sergio-souza-xuf4DSzU4JI-unsplash.jpg';
import { ComparisonContainer, ExperimentContainer } from '../parallel-fetch-and-render';
import { fetchColor } from '../../utils/fetch-color';
import { wrapPromise } from '../../utils/wrap-promise';

const StyledButton = styled.button`
  font-size: 1.5em;
  padding: 0.4em 1em;
  margin: 1em;
  box-shadow: gray 1px 1px 5px;
  background-color: whitesmoke;
  cursor: pointer;
`;

export const Transitions = withRouter(() => {
  let [palette, setPalette] = useState(0);

  const goNextPalette = useCallback((p) => {
    setPalette((p + 1) % 2);
  }, []);

  return (
    <>
      <h1>Transitions</h1>
      <StyledButton onClick={() => goNextPalette(palette)}>Next</StyledButton>
      <ComparisonContainer>
        <ExperimentContainer>
          <h2>Receded-Skeleton-Complete</h2>
      {
        palette % 2 === 0 ?
        <BoxMatrix title={"Receded-Skeleton-Complete"}
                   times={7}
                   component={<FetchOnRenderBox index={10} timeout={500}
                                                palette={palette} />}
        />
          : <ImageLoader />
      }
        </ExperimentContainer>
      </ComparisonContainer>
    </>
  );
});

const ImageLoader = () => {
  let [resource, setResource] = useState(null);
  useEffect(() => {
    let resource = wrapPromise(fetchColor(0, 5000));
    setResource(resource);
  }, []);
  return (
    <Suspense fallback={<Loader>+</Loader>}>
      <DogImage resource={resource} />
    </Suspense>
  )
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`  
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
  width: auto;
  height: auto;
  color: gray;
  font-size: 10em;  
`;

const StyledImg = styled.img`
  width: 300px;
`;

const DogImage = ({ resource }) => {
  if (!resource) return null;
  resource.read();
  return <StyledImg src={dogImg} alt={'dog image'} />;
};