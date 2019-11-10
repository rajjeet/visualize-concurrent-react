import React, { useEffect, useState } from 'react';
import { fetchColor } from '../../utils/fetch-color';
import { StyledBox } from './styled-box';

export const FetchThenRenderBox = ({ index = 1 }) => {
  let [colors, setColors] = useState([]);

  useEffect(() => {
    const promises = [];
    const cancels = [];
    for (let i = 0; i < index; i++) {
      let {promise, cancel} = fetchColor(index - i);
      promises.push(promise);
      cancels.push(cancel);
    }
    Promise.all(promises).then(values => setColors(values));
    return () => cancels.forEach(cancel => cancel());
  }, []);

  if (!colors.length) return null;

  const boxes = [];
  for (let i = 0; i < index; i++) {
    boxes.push(<StyledBox key={i} color={colors[i]} />)
  }
  return <div>{boxes}</div>;
};