import { Route, Switch } from 'react-router'

import { companies } from './bd.imitation.js'
import About from './Components/About/About.js'
import Companies from './Components/Companies/Companies.js'
import NavBar from './Components/NavBar/NavBar.js'
import News from './Components/News/News.js'
import Offer from './Components/Offer/Offer.js'

function App() {
  console.log(companies)
  return (
    <div className="App">
      <Switch>
        <NavBar />
        <Route path={'/'}>
          <News />
          <Companies />
          <Offer />
          <About />
        </Route>
        <Route path={'/companies/:id'} />
      </Switch>
    </div>
  )
}

export default App
