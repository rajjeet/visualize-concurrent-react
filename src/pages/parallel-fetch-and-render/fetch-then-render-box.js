import React, { useEffect, useState } from 'react';
import { fetchColor } from './fetch-color';
import { StyledBox } from './styled-box';

export const FetchThenRenderBox = ({ index = 1 }) => {
  let [colors, setColors] = useState([]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < index; i++) {
      promises[i] = fetchColor(index - i);
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