import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../users/actions';

class Header extends React.Component {

  render() {
    const headerNavigation = this.props.headerData;
    const user = this.props.user || {};
    let thisList = {};
    if (headerNavigation && headerNavigation.length >= 1) {
      thisList = headerNavigation.map((thisEl, id) => 
        <Link key={id} to={thisEl.link} className="href">{thisEl.title}</Link>
      );
    }
    console.log('header: ', this.props)
    return (
      <section className="navigation-grid">
        {headerNavigation && headerNavigation.length >= 1 && thisList}
        {!user.id && <Link key='logIn' to='log-in' className="href">Log In</Link>}
        {user.id && <div key='logOut' onClick={this.logOut} className="href">Log Out</div>}
        {user.id && <div key='welcome' className="info-msg">{user.fullName}</div>}
      </section>
    );
  }

  logOut = () => {
    let { dispatch } = this.props;
    const action = actions.unset();
    dispatch(action);
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Header);