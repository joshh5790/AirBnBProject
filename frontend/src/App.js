import Navigation from "./components/Navigation";
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import HomePage from "./components/Pages/home";
import SpotDetails from "./components/Pages/spotDetails";
import NewSpot from "./components/Pages/newSpot";
import ManageSpots from "./components/Pages/manageSpots";
import ManageReviews from "./components/Pages/manageReviews";
import MapContainer from "./components/Pages/maps";
import AccountSettings from "./components/Pages/accountSettings";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const [sessionCheck, setSessionCheck] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUserThunk())
    .then(() => setIsLoaded(true))
    // dispatch(restoreUserThunk())
    // .then(res => {
    //   if (!res.user) {
    //     history.push('/')
    //     location.reload()
    //   }
    // })
  }, [dispatch, sessionCheck]) // pass down setSessionCheck to every page


  return (
    <>
      <Switch>
        <Route exact path='/'>
          {isLoaded && <HomePage setSessionCheck={setSessionCheck} />}
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
        <Route exact path='/account'>
          {isLoaded && <AccountSettings />}
        </Route>
      </Switch>
      <Navigation isLoaded={isLoaded}/>
    </>
  );
}

export default App;
