import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const authCtx = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      authCtx.logout()
    }, 1000*10);

    // console.log(history.location.pathname)
    return () => {
      clearTimeout(timeoutId);
    }
  },[location.pathname])
  



  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
        </Route>

        <Route path='*'>
            <Redirect to='/'/>
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
