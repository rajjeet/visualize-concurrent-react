import React, { Suspense, useCallback, useTransition, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { BoxMatrix } from '../../components/box-matrix';
import { FetchOnRenderBox } from '../parallel-fetch-and-render/fetch-on-render-box';
import dogImg from './sergio-souza-xuf4DSzU4JI-unsplash.jpg';
import { ComparisonContainer, ExperimentContainer } from '../parallel-fetch-and-render';
import { wrapPromise } from '../../utils/wrap-promise';

const StyledButton = styled.button`
  font-size: 1.5em;
  padding: 0.4em 1em;
  margin: 1em;
  box-shadow: gray 1px 1px 5px;
  background-color: whitesmoke;
  cursor: pointer;
`;

const fetchImage = () => {
  let timeout;
  let promise = new Promise(resolve => {
    timeout = setTimeout(() => resolve(dogImg), 4000);
  });
  return {
    cancel() {
      if (timeout) clearTimeout(timeout);
    },
    promise
  }
};

const fetchData = () => ({
  image: wrapPromise(fetchImage().promise)
});

export const Transitions = () => {
  let [page, setPage] = useState(0);
  let [resource, setResource] = useState(null);
  let [startTransition, isPending] = useTransition({ timeoutMs: 3000 });

  const goNextPage = useCallback((currPage) => {
    setPage(currPage + 1);
    startTransition(() => {
      let resource = page % 2 === 1 ? fetchData() : null;
      setResource(resource);
    });
  }, []);

  return (
    <>
      <h1>Transitions</h1>
      <StyledButton onClick={() => goNextPage(page)}>Next</StyledButton>
      <ComparisonContainer>
        <ExperimentContainer>
          <h2>Pending-Skeleton-Complete</h2>
          {isPending && <div>Loading dog image...</div>}

          {
            page % 2 === 0 ? <BoxMatrix
                times={7}
                component={<FetchOnRenderBox index={10} timeout={500} />}
              />
              : <ImageLoader resource={resource} />
          }

        </ExperimentContainer>
      </ComparisonContainer>
    </>
  );
};

const ImageLoader = ({ resource }) => {
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
  return <StyledImg src={resource.image.read()} alt={'dog image'} />;
};