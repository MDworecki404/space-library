import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import './App.css'
import gargantua from './assets/gargantua.mp4'
function App() : JSX.Element {
    return (
      <Router>
        <video autoPlay muted loop className={"gargantua"}>
            <source src={gargantua}></source>
        </video>
      </Router>
  )
}

export default App
