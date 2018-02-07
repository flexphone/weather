import React from 'react';
import { connect } from 'react-redux';
import { getWeather, removePlace, reorder } from '../actions/actions';
import { CSSTransitionGroup } from 'react-transition-group';
import { Route, withRouter } from 'react-router-dom';
import AddMore from './AddMore';
import ConditionsList from './ConditionsList';
import Forecast from './Forecast';
import { DragDropContext } from 'react-beautiful-dnd';
import '../App.css';

const reorderArr = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(result);
  return result;
};

class App extends React.Component {

  componentDidMount() {
    const { dispatch, places } = this.props;
    const singleUpdate = true;
    if (!!places) {
      places.map(place => dispatch(getWeather(place.id, singleUpdate)))
    }
  }

  newPlace = (newPlace) => {
    const { dispatch } = this.props;
    dispatch(getWeather(newPlace));
  }

  removeItem = (id) => {
    const { dispatch } = this.props;
    dispatch(removePlace(id));
  }

  updateItem = (id) => {
    const { dispatch } = this.props;
    const singleUpdate = true;
    dispatch(getWeather(id, singleUpdate));
  }

  onDragEnd = (result) => {
    const { dispatch, places } = this.props;
    if (!result.destination) {
      return;
    }

    const reorderedPlaces = reorderArr(
      places,
      result.source.index,
      result.destination.index
    );

    return dispatch(reorder(reorderedPlaces));
  };

  render() {
    const { places, notFound } = this.props;
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <Route render={({ location }) => (
          <div>
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={1000}
              transitionLeaveTimeout={100}
              transitionAppear={true}
              // transitionLeave={true}
              transitionAppearTimeout={600}
              >
                <Route
                  location={location}
                  key={location.pathname}
                  exact
                  path="/"
                  render={({...props}) => (
                    <div>
                      <AddMore newPlace={this.newPlace}/>
                      { !!places && !notFound &&
                        <ConditionsList places={places} removeItem={this.removeItem} updateItem={this.updateItem} {...props}/>
                      }
                      { notFound &&
                        <CSSTransitionGroup
                          transitionName="fade"
                          transitionAppear={true}
                          transitionLeave={true}
                          transitionEnterTimeout={1000}
                          transitionAppearTimeout={750}
                          transitionLeaveTimeout={750}
                          >
                            <h2>Oops! Your search returned no results. Check your spelling and try again! <span style={{fontSize: 48}}>🤔</span></h2>
                          </CSSTransitionGroup>
                        }
                      </div>
                    )}
                  />
                </CSSTransitionGroup>
                <CSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={500}
                  >
                    <Route
                      location={location}
                      key={location.pathname}
                      path={`/forecast/:forecastId`}
                      render={({...props}) => (
                        <Forecast {...props}/>
                      )}
                    />
                  </CSSTransitionGroup>
                </div>
              )}/>

      </DragDropContext>
    )
  }
}


function mapStateToProps(state, ownProps) {
  const {
    handleWeather,
  } = state;
  const {
    places,
    notFound,
    reorder
  } = handleWeather;
  return {
    places,
    notFound,
    reorder,
  }
}

export default withRouter(connect(mapStateToProps)(App))
