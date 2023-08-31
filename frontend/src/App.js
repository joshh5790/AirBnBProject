import Navigation from "./components/Navigation";
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import HomePage from "./components/Page_home";
import SpotDetails from "./components/Page_spotDetails";
import NewSpot from "./components/Page_newSpot";
import ManageSpots from "./components/Page_manageSpots";
import ManageReviews from "./components/Page_manageReviews";
import MapContainer from "./components/Page_maps";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk())
    .then(() => setIsLoaded(true))
  }, [dispatch])


  return (
    <>
      <Switch>
        <Route exact path='/'>
          {isLoaded && <HomePage />}
        </Route>
        <Route exact path='/spots/new'>
          {isLoaded && <NewSpot />}
        </Route>
        <Route exact path='/spots/current'>
          {isLoaded && <ManageSpots />}
        </Route>
        <Route exact path='/spots/:id'>
          {isLoaded && <SpotDetails />}
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          {isLoaded && <NewSpot />}
        </Route>
        <Route exact path='/reviews/current'>
          {isLoaded && <ManageReviews />}
        </Route>
        <Route exact path='/spots/:spotId/map'>
          {isLoaded && <MapContainer />}
        </Route>
      </Switch>
      <Navigation isLoaded={isLoaded}/>
    </>
  );
}

export default App;
