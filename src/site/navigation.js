import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const CustomNavLink = (props) => <NavLink activeClassName='selected' {...props} />;

const StyledLink = styled(CustomNavLink)`
  padding: .5em;
  margin: .5em;
  font-size: 2em;
  text-decoration: none;
  :visited {
    color: inherit;
  }
  :hover, &.selected {
    background-color: darkblue;
    color: white;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border: 5px solid gray;
`;

export function Navigation() {
  return <LinkContainer>
    <StyledLink to={'/parallel-fetch-and-render'}>Parallel Fetch & Render</StyledLink>
    <StyledLink to={'/transitions'}>Transitions</StyledLink>
    <StyledLink to={'/high-low-priority-state'}>High/Low Priority State</StyledLink>
    <StyledLink to={'/deferring-state'}>Deferring State</StyledLink>
    <StyledLink to={'/suspense-list'}>Suspense List</StyledLink>
  </LinkContainer>;
}