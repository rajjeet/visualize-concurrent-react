import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoxMatrix } from '../../components/box-matrix';
import { FetchOnRenderBox } from '../parallel-fetch-and-render/fetch-on-render-box';
import { ComparisonContainer } from '../parallel-fetch-and-render';
import { Link, NavLink, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

const StyledButton = styled.button`
  font-size: 1.5em;
  padding: 0.4em 1em;
  margin: 1em;
  box-shadow: gray 1px 1px 5px;
  background-color: whitesmoke;
  cursor: pointer;
`;

const renderRoute = (palette) => {
  return (
    <Route exact path={`/transitions/${palette}`}
           render={<BoxMatrix title={"Receded-Skeleton-Complete"}
                              times={7}
                              render={() => <FetchOnRenderBox index={10} timeout={500}
                                                              palette={palette} />}
           />}
    />
  );
};

export const Transitions = withRouter(({ location, history }) => {
  let [palette, setPalette] = useState(0);

  const goNextPalette = useCallback((p) => {
    setPalette((p + 1) % 2);
  }, []);

  return (
    <>
      <h1>Transitions</h1>
      <StyledButton onClick={() => goNextPalette(palette)}>Next</StyledButton>
      {
        palette % 2 === 0 ?
        <BoxMatrix title={"Receded-Skeleton-Complete"}
                   times={7}
                   component={<FetchOnRenderBox index={10} timeout={500}
                                                palette={palette} />}
        />
          : <h3>Placeholder</h3>
      }
    </>
  );
});