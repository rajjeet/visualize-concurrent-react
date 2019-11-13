import React, { Suspense, useEffect, useState, SuspenseList, useCallback } from 'react';
import { fetchColor } from '../utils/fetch-color';
import { wrapPromise } from '../utils/wrap-promise';

export const SuspenseListContainer = () => {
  return (
    <>
      <h1>Suspense List</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Experiment num={15} revealOrder={'forwards'} />
        <Experiment num={15} revealOrder={'backwards'} />
        <Experiment num={15} revealOrder={'together'} />
      </div>
    </>
  );
};

const Experiment = ({ num, revealOrder }) => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    let promises = [], cancels = [];
    for (let i = 0; i < num; i++) {
      let timeout = undefined;
      switch(revealOrder){
        case 'forwards':
          timeout = 1000 * i;
          break;
        case 'backwards':
          timeout = 20000 - i * 1000;
      }
      let { promise, cancel } = fetchColor(i, timeout);
      cancels.push(cancel);
      promises.push(wrapPromise(promise));
    }
    setResource(promises);
    return () => cancels.forEach(c => c());
  }, []);

  const renderColorBoxes = useCallback(() => {
    let colorBoxes = [];
    for (let i = 0; i < num; i++) {
      colorBoxes.push(<ColorBox key={i} resource={resource} index={i} />);
    }
    return colorBoxes;
  }, [resource]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <h2>{revealOrder}</h2>
      <SuspenseList revealOrder={revealOrder}>
        {renderColorBoxes()}
      </SuspenseList>
    </div>
  )
};

const ColorBox = ({ resource, index }) => {
  return (
    <Suspense fallback={<Box color={'white'} />}>
      <ColorBoxLoader resource={resource} index={index} />
    </Suspense>
  )
};

const ColorBoxLoader = ({ resource, index }) => {
  if (!resource) return null;
  return <Box color={resource[index].read()} />;
};

const Box = ({ color }) => (
  <div
    style={{
      border: '3px solid gray',
      backgroundColor: color,
      width: '100px',
      height: '10px',
      padding: '.5em',
      margin: '.25em 1em'
    }} />
);
