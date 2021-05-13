import { Route, Switch } from 'react-router'

import { companies } from './bd.imitation.js'
import About from './Components/About/About.js'
import Companies from './Components/Companies/Companies.js'
import NavBar from './Components/NavBar/NavBar.js'
import News from './Components/News/News.js'
import Offer from './Components/Offer/Offer.js'

import cls from './App.module.sass'

function App() {
  console.log(companies)
  return (
    <div className={cls.App}>
      <NavBar />
      <Switch>
        <Route path={'/'}>
          <div className={cls.AppWrapper}>
            <News />
            <Companies />
          </div>
          <Offer />
          <div className={cls.AppWrapper}>
            <About />
          </div>
        </Route>
        <Route path={'/companies/:id'} />
      </Switch>
    </div>
  )
}

export default App
