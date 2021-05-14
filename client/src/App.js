import { Redirect, Route, Switch } from 'react-router'

import { useMutation, useQuery } from '@apollo/client'
import { GET_ONE_USER } from './query/user.js'

import About from './Components/About/About.js'
import Companies from './Components/Companies/Companies.js'
import NavBar from './Components/NavBar/NavBar.js'
import News from './Components/News/News.js'
import Offer from './Components/Offer/Offer.js'

import cls from './App.module.sass'
import Auth from './Components/Login/Auth.js'
import { useEffect, useState } from 'react'
import Profile from './Components/Profile/Profile.js'
import { GET_COMPANIES } from './query/company.js'

function App() {
  const [user, setUser] = useState({ _id: null, isLogin: false })

  const setUserData = (user, isLogin, role) => {
    setUser({ ...user, isLogin, role })
  }

  const logout = () => {
    setUser({ _id: null, isLogin: false })
  }
  console.log(user)
  return (
    <div className={cls.App}>
      <NavBar isLogin={user.isLogin} logout={logout} />
      <Switch>
        <Route path={'/'} exact>
          <News />
          <Companies isUser={user.role !== 'Компания'} {...user} />
          <Offer />
          <About />
        </Route>
        <Route
          path={'/login'}
          render={() => (
            <Auth setUserData={setUserData} isLogin={user.isLogin} />
          )}
        />
        <Route
          path={'/signup'}
          render={() => (
            <Auth setUserData={setUserData} isLogin={user.isLogin} />
          )}
        />
        {user.isLogin && (
          <Route path={'/profile'} component={() => <Profile {...user} />} />
        )}
        {!user.isLogin && (
          <Route
            path={'/profile'}
            component={() => <Redirect from="/profile" to="/" />}
          />
        )}

        <Route path={'/companies/:id'} />
      </Switch>
    </div>
  )
}

export default App
