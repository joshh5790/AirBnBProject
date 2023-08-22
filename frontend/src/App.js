import Navigation from "./components/Navigation";
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import { retrieveAllSpots } from "./store/spots";
import HomePage from "./components/HomePage";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    dispatch(retrieveAllSpots())
  }, [dispatch])

  return (
    <div>
      <Navigation isLoaded={isLoaded}/>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
