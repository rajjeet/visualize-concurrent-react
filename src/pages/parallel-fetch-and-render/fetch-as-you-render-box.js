import React, { Suspense, useEffect, useState } from 'react';
import { fetchColor } from './fetch-color';
import { wrapPromise } from '../../utils/wrap-promise';
import { StyledBox } from './styled-box';

export const FetchAsYouRenderBox = ({ index = 1 }) => {
  let [resource, setResource] = useState(null);

  useEffect(() => {
    let colorPromise = fetchColor(index);
    let resource = wrapPromise(colorPromise);
    setResource(resource);
  }, []);

  return (
    <div>
      <Suspense fallback={<StyledBox color={'white'} />}>
        <ResourceBox resource={resource} />
      </Suspense>
      {index > 1 && <FetchAsYouRenderBox index={index - 1} />}
    </div>
  )
};

const ResourceBox = ({ resource }) => {
  return resource && <StyledBox color={resource.read()} />;
};