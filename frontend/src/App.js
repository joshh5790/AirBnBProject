import Navigation from "./components/Navigation";
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import HomePage from "./components/Page_home";
import SpotDetails from "./components/Page_spotDetails";
import NewSpot from "./components/Page_newSpot";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
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
        <Route exact path='/spots/:id'>
          <SpotDetails />
        </Route>
      </Switch>
      <Navigation isLoaded={isLoaded}/>
    </>
  );
}

export default App;
