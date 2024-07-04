import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ProfileButton from "./Profilebutton.js";
import CartButton from "./CartButton.js";
import ProfileButton2 from "./Profilebutton2.js"; // Import the LoginButton component
import { Box } from '@mui/material'; // Import Box component for layout

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem('authToken') // Check if auth token is available
    };
  }

  componentDidMount() {
    this.checkAuthToken();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      this.checkAuthToken();
    }
  }

  checkAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setState({ isAuthenticated: true });
    } else {
      this.setState({ isAuthenticated: false });
    }
  }

  handleLogin = () => {
    // Mock login action: you can replace it with real authentication logic
    localStorage.setItem('authToken', 'sampleAuthToken');
    this.setState({ isAuthenticated: true });
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    this.setState({ isAuthenticated: false });
  }

  render() {
    const { isAuthenticated } = this.state;
    const { handleOpenCart } = this.props;

    return (
      <nav style={{ fontSize: 24, backgroundColor: 'darkorange' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ marginTop: 0, marginBottom: 0, fontSize: 30 }}>RAJDHANI</p>
          </div>

          <div className="right align" style={{ marginRight: '0px', display: 'flex', flexDirection: 'row' }}>
            {isAuthenticated ? (
              <>
                <ProfileButton2 onLogin={this.handleLogin} />
              </>
            ) : (
              <ProfileButton />
            )}
            <CartButton handleOpenCart={handleOpenCart} />
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
