import React, { useEffect, useState, Suspense } from 'react';
import styled from 'styled-components';
import { wrapPromise } from '../utils/wrap-promise';

const StyledBox = styled.div`
  background-color: ${props => props.color};
  border: 3px solid darkslategray;
  height: 30px;
  width: 30px;
  margin: .2em;
`;

const BoxContainer = styled.div`
  display: flex;
`;

const ComparisonContainer = styled.div`
  display: flex;  
  justify-content: space-around;
`;

const fetchColor = () => {
  return new Promise(resolve => {
    const color = ['blue', 'green', 'red', 'purple', 'orange'][Math.floor(Math.random() * 5)];
    setTimeout(() => resolve(color), Math.random() * 10000 + 1000);
  });
};

const Box = ({ index = 1 }) => {
  let [color, setColor] = useState('white');

  useEffect(() => {
    fetchColor().then((c) => setColor(c));
  }, []);

  if (color === 'white') return <StyledBox color={color} />;

  return (
    <div>
      <StyledBox color={color} />
      {index > 1 && <Box index={index - 1} />}
    </div>
  )
};

const Box2 = ({ index = 1 }) => {
  let [colors, setColors] = useState([]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < index; i++) {
      promises[i] = fetchColor();
    }
    Promise.all(promises).then(values => setColors(values));
  }, []);

  if (!colors.length) return null;

  const boxes = [];
  for (let i = 0; i < index; i++) {
    boxes.push(<StyledBox key={i} color={colors[i]} />)
  }
  return <div>{boxes}</div>;
};

const Box3 = ({ index = 1 }) => {
  let [resource, setResource] = useState(null);

  useEffect(() => {
    let colorPromise = fetchColor();
    let resource = wrapPromise(colorPromise);
    setResource(resource);
  }, []);

  return (
    <div>
      <Suspense fallback={<StyledBox color={'white'} />}>
        <ResourceBox resource={resource} />
      </Suspense>
      {index > 1 && <Box3 index={index - 1} />}
    </div>
  )
};

const ResourceBox = ({resource}) => {
  return resource && <StyledBox color={resource.read()} />;
};

export const ParallelFetchAndRender = () => {
  return (
    <div>
      <h1>Parallel Fetch & Render</h1>
      <ComparisonContainer>
        <div>
          <h2>Fetch-On-Render</h2>
          <BoxContainer>
            <Box index={10} />
            <Box index={10} />
            <Box index={10} />
            <Box index={10} />
            <Box index={10} />
          </BoxContainer>
        </div>
        <div>
          <h2>Fetch-Then-Render</h2>
          <BoxContainer>
            <Box2 index={10} />
            <Box2 index={10} />
            <Box2 index={10} />
            <Box2 index={10} />
            <Box2 index={10} />
          </BoxContainer>
        </div>
        <div>
          <h2>Fetch-As-You-Render</h2>
          <BoxContainer>
            <Box3 index={10} />
            <Box3 index={10} />
            <Box3 index={10} />
            <Box3 index={10} />
            <Box3 index={10} />
          </BoxContainer>
        </div>
      </ComparisonContainer>
    </div>
  );
};