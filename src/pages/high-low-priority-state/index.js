import React, { Suspense, useCallback, useState, useTransition } from 'react';
import styled from 'styled-components';
import { wrapPromise } from '../../utils/wrap-promise';
import { Loader } from '../transitions';

const StyledInput = styled.input`
  font-size: 2em;
  margin: .5em;
  padding: .5em;
  
`;

const DisabledInput = (props) => <input {...props} disabled={true} />;
const UpperCaseBoxStyle = styled(DisabledInput)`
  font-size: 2em;
  padding: .5em;
  margin: .5em;
  border: 1px solid grey;
`;

const fetchUpperCase = (text) => {
  let timeout;
  let promise = new Promise(resolve => {
    timeout = setTimeout(() => resolve(text.toUpperCase()), 1000);
  });
  let cancel = () => {
    if (timeout) clearTimeout(timeout);
  };
  return {
    promise,
    cancel
  };
};

export const HighLowPriorityState = () => {
  return (
    <div>
      <h1>High/Low Priority State</h1>
      <div>
        <Experiment title={'Non-prioritized State'} isPrioritized={false} />
        <Experiment title={'Prioritized State'} isPrioritized={true} />
      </div>
    </div>
  );
};

const Experiment = ({title, isPrioritized}) => {
  let [value, setValue] = useState("");
  let [resource, setResource] = useState(null);
  let [startTransition, isPending] = useTransition({ timeoutMs: 2000 });

  const onChange = useCallback((e) => {
    let text = e.target.value;
    let { promise, cancel } = fetchUpperCase(text);
    if (isPrioritized) {
      setValue(text);
      startTransition(() => {
        setResource(wrapPromise(promise));
      });
    } else {
      startTransition(() => {
        setValue(text);
        setResource(wrapPromise(promise));
      });
    }

    return cancel;
  }, []);

  return (
    <>
      <h2>{title}</h2>
      <UpperCaseGenerator onChange={onChange} value={value} resource={resource}
                          pending={isPending} />
    </>
  );
};

function UpperCaseGenerator(props) {
  return <>
    <StyledInput onChange={props.onChange} value={props.value} />
    <Suspense fallback={<UpperCaseBoxStyle value={'No result'} />}>
      <UpperCaseBox resource={props.resource} />
    </Suspense>
    {props.pending && <Loader size={4}>+</Loader>}
  </>;
}

const UpperCaseBox = ({ resource }) => {
  if (!resource) return <UpperCaseBoxStyle value={'Enter some text'} />;
  return <UpperCaseBoxStyle value={resource.read()} />;
};