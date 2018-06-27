import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../css/main.css';
import Header from '../navigations/Header';
import UserLogIn from '../users/UserLogIn';
import UserLogOut from '../users/UserLogOut';
import Video from '../video/Video';
import VideoList from '../video/VideoList';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      header: []
    };
  }

  componentDidMount() {

    fetch('/data/get/navigations')
    .then(res => res.json())
    .then(
      (result) => {
        if (result && result.header) this.setState({ header: result.header })
      },
      (error) => {}
    )
  }

  render() {
    const headerData = this.state.header;
    let routeComponents = {};
    const routesComponents = {'list': VideoList};

    if (headerData.length >= 1) {
      routeComponents = headerData.map(
        (thisEl) => {
          let isOK = true;
          if (thisEl.link === '/') isOK = false;
          if (isOK) {
          return <Route path={thisEl.link}
              render={(props) => {
                const ComponentName = routesComponents[thisEl.type];
                return <ComponentName vlid={thisEl.id} listURI={thisEl.link} {...props} />
              }}
              key={thisEl.id}
              listId={thisEl.id}
            />
          }
          return [];
        }
      );
    }
    
    return (
      <div className='App'>
        <Header headerData={headerData} />
        <Route exact path='/' component={Video}/>
        <Route exact path='/log-in' component={UserLogIn}/>
        <Route exact path='/log-out' component={UserLogOut}/>
        <Route path='/videos' component={VideoList}/>
        <Route path='/video' component={Video}/>
        {headerData.length >= 1 && routeComponents}
      </div>
    );
  }
}

export default App;
