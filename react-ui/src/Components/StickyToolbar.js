import React from 'react';
import SearchBox from './SearchBox';
import { NavLink } from 'react-router-dom';

const StickyToolbar = (props) => {
  return (
    <div className="sticky-toolbar-container">
      <SearchBox handleUpdates={props.handleUpdates} />
      <div className="sticky-toolbar-nav">
        <NavLink to={{ pathname: '/'}}>
          Home
        </NavLink>
        <NavLink to={{ pathname: '/forecast'}}>
          Forecast
        </NavLink>
      </div>
    </div>
  )
}

export default StickyToolbar;
