/* Import pages */
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Career from './pages/Career'
import JobOffer from './pages/JobOffer'

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" id="yolk">
      <Header />
      <div className="main" onScroll={onscroll}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/career" component={Career} exact />
          <Route path="/career/:id" component={JobOffer} />
          <Route path="*" component={Home} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

export default App;
