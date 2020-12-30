import logo from './logo.svg';
import './App.css';
import packageJson from '../package.json'
import React from 'react'
import Editor from './components/Editor'
import Composer from './pages/Composer'
import Player from './pages/Player'
import Home from './pages/Home'
import DirectusSDK from "@directus/sdk-js";

import { BrowserRouter, Link, Route, Switch, useHistory } from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import { Icon, Nav, Navbar } from 'rsuite';
//npm i @directus/sdk-js@5.3.4
function App() {

  const api = new DirectusSDK({
    url: "http://musicale.netsons.org/public",
    project: "musicale", // da cambiare
    storage: window.localStorage
  });

  window.api = api;
  window.document.title = `Musicale V${packageJson.version}`
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/player">
            <Player />
          </Route>
          <Route path="/composer">
            <Composer />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeKey: null
    }
  }

  render() {
    const { activeKey } = this.state
    return (
      <Navbar appearance={'inverse'} style={{ 'marginBottom': "5px" }}>
        <Navbar.Header>
          <Nav onSelect={(key) => this.setState({ activeKey: key })} activeKey={activeKey}>
            <Nav.Item componentClass={Link}
              eventKey={'home'}
              to={'/'}
              icon={<Icon icon='headphones' />}
            >
              Musicale
            </Nav.Item>
          </Nav>
        </Navbar.Header>
        <Navbar.Body>
          <Nav activeKey={activeKey} onSelect={(key) => this.setState({ activeKey: key })}>
            <Nav.Item
              icon={<Icon icon='paint-brush' />}
              eventKey={'1'} componentClass={Link} to='/composer' style={{ color: 'white' }}>
              Composer
            </Nav.Item>
            <Nav.Item
              icon={<Icon icon='play2' />}
              eventKey={'2'} componentClass={Link} to='/player' style={{ color: 'white' }}>
              Player
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    )
  }
}

export default App;


