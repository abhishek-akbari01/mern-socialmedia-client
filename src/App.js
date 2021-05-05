import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './components/Navbar';
import {Route,BrowserRouter,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'

export const userContext = createContext() 

const Routing = () => {


  const {state,dispatch} = useContext(userContext)

  const history = useHistory()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user)
    {
      dispatch({type:"USER",payload:user})
      // history.push('/')
    }
    else
    {
      history.push('/login')
    }

  }, [])

  return(
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/signin'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route exact path='/profile'>
        <Profile/>
      </Route>
      <Route path='/create'>
        <CreatePost/>
      </Route>
      <Route path='/profile/:userid'>
        <UserProfile/>
      </Route>
    </Switch>
  )
}
 

function App() {

  const [state,dispatch]  = useReducer(reducer,initialState)

  return (
    <userContext.Provider value={{state,dispatch}}> 
    <BrowserRouter>
      <Navbar/>
      <Routing/>
    </BrowserRouter>
    </userContext.Provider>
    
  );
}

export default App;
