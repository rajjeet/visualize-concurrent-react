import React, { useEffect, useState } from 'react';
import { fetchColor } from '../../utils/fetch-color';
import { StyledBox } from './styled-box';

export const FetchOnRenderBox = ({ index = 1, timeout, palette }) => {
  let [color, setColor] = useState('white');

  useEffect(() => {
    let {promise, cancel} = fetchColor(index, timeout, palette);
    promise.then((c) => setColor(c));
    return () => cancel();
  }, [palette]);

  if (color === 'white') return <StyledBox color={color} />;

  return (
    <div>
      <StyledBox color={color} />
      {index > 1 && <FetchOnRenderBox index={index - 1} timeout={timeout} palette={palette} />}
    </div>
  )
};