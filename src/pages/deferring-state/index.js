import React, { useCallback, useState, useDeferredValue, memo } from 'react';

export const DeferringState = () => {
  return (
    <>
      <h1>Deferring State</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Experiment title={'Without Deferred State'} useDeferredText={false} />
        <Experiment title={'With Deferred State'} useDeferredText={true} />
      </div>
    </>
  );
};

const Experiment = ({ title, useDeferredText }) => {
  const [text, setText] = useState("");
  const handleChange = useCallback((e) => {
    const value = e.target.value;
    setText(value);
  }, []);
  const deferredText = useDeferredValue(text, { timeoutMs: 5000 });
  return (
    <div style={{padding: '1em', margin: '1em'}}>
      <h2>{title}</h2>
      <input onChange={handleChange} value={text} style={{fontSize: '2em'}} />
      <div >
        <SlowList text={useDeferredText ? deferredText : text} />
      </div>
    </div>
  );
};

const SlowList = memo(function SlowList({ text }) {
  return (
    <ul>
      {generateListItems(text)}
    </ul>
  );
});

const generateListItems = (text) => {
  let list = [];
  for (let i = 0; i < 200; i++) {
    list.push(<ListItem key={i} text={text} />)
  }
  return list;
};

const ListItem = ({ text }) => {
  let now = performance.now();
  while (performance.now() - now < 5) {
    // empty
  }
  return <li>{text}</li>
};
