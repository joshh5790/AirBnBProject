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
          <HomePage />
        </Route>
        <Route exact path='/spots/new'>
          <NewSpot />
        </Route>
        <Route exact path='/spots/current'>
          <ManageSpots />
        </Route>
        <Route exact path='/spots/:id'>
          <SpotDetails />
        </Route>
        <Route exact path='/spots/:spotId/edit'>
          <NewSpot />
        </Route>
        <Route exact path='/reviews/current'>
          <ManageReviews />
        </Route>
      </Switch>
      <Navigation isLoaded={isLoaded}/>
    </>
  );
}

export default App;
