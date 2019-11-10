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
  let [resource2, setResource2] = useState(null);
  let [startTransition, isPending] = useTransition({ timeoutMs: 5000 });

  const goNextPageReceding = useCallback((currPage) => {
    let nextPage = currPage + 1;
    setPage(nextPage);
    let resource2 = nextPage % 2 === 1 ? fetchData() : null;
    setResource2(resource2);
  }, []);

  const goNextPagePending = useCallback((currPage) => {
    let nextPage = currPage + 1;
    setPage(nextPage);
    startTransition(() => {
      let resource = nextPage % 2 === 1 ? fetchData() : null;
      setResource(resource);
    });
  }, []);

  return (
    <>
      <h1>Transitions</h1>
      <StyledButton onClick={() => goNextPageReceding(page)}>Next Receding</StyledButton>
      <StyledButton onClick={() => goNextPagePending(page)}>Next Pending</StyledButton>
      <ComparisonContainer>
        <Receding resource={resource2} />
        <Pending resource={resource} isPending={isPending} />
      </ComparisonContainer>
    </>
  );
};

const Pending = ({ isPending, resource }) => {
  return <ExperimentContainer>
    <h2>Pending-Skeleton-Complete</h2>
    {isPending && <div>Loading dog image...</div>}
    <BoxLoader resource={resource} />
    <ImageLoader resource={resource} />
  </ExperimentContainer>;
};

const Receding = ({ resource }) => {
  return <ExperimentContainer>
    <h2>Receding-Skeleton-Complete</h2>
    <BoxLoader resource={resource} />
    <ImageLoader resource={resource} />
  </ExperimentContainer>;
};


const BoxLoader = ({ resource }) => {
  if (resource) return null;
  return <BoxMatrix
    times={7}
    component={<FetchOnRenderBox index={10} timeout={500} />}
  />;
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