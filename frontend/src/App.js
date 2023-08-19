import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  
  useEffect(() => {
    if (sessionUser) setIsLoaded(true)
  }, [])

  return (
    <div>
      <Navigation />
      <Switch>
        <Route exact path='/login'>
          {isLoaded && <LoginFormPage />}
        </Route>
        <Route path="/signup">
          {isLoaded && <SignupFormPage />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
