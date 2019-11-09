import React, { useEffect, useState } from 'react';
import { fetchColor } from './fetch-color';
import { StyledBox } from './styled-box';

export const FetchOnRenderBox = ({ index = 1 }) => {
  let [color, setColor] = useState('white');

  useEffect(() => {
    fetchColor(index).then((c) => setColor(c));
  }, []);

  if (color === 'white') return <StyledBox color={color} />;

  return (
    <div>
      <StyledBox color={color} />
      {index > 1 && <FetchOnRenderBox index={index - 1} />}
    </div>
  )
};