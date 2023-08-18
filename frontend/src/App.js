import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import { Route, Switch } from 'react-router-dom'
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => setIsLoaded(true))
  })

  return (
    <div>
      <h1>Hello from App</h1>
      <div>
        <NavLink exact to='/login'>Login</NavLink>
      </div>
      <div>
        <NavLink exact to='/'>Home</NavLink>
      </div>
      <div>
        <NavLink exact to='/signup'>Signup</NavLink>
      </div>
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
