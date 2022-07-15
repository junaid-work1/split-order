import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit'
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact'
import { useSelector } from 'react-redux'

import './header.css'

const Header = () => {
  const [showNavText, setShowNavText] = useState(false)
  const activeUser = useSelector(state => state.activeUser)

  return (
    <div className='row '>
      <MDBNavbar expand='lg' dark bgColor='success'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='label'>Split Order</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavText(!showNavText)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavText}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <Link to='/' className='header-links'>
                  <MDBNavbarLink to='/' className='label' active aria-current='page'>
                    Home
                  </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='usercard' className='header-links'>
                  <MDBNavbarLink className='label'>Split Bill</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='totalbill' className='header-links'>
                  <MDBNavbarLink className='label'>Total Bill</MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <MDBNavbarLink>
              <MDBDropdown>
                {activeUser.name ? (
                  <MDBDropdownToggle nav caret className='navbar-text drop-down'>
                    <div className='d-none d-md-inline box-text label'>{activeUser?.name}</div>
                  </MDBDropdownToggle>
                ) : (
                  <Link to='login' className='header-links login-btn label'>
                    Login
                  </Link>
                )}
                <MDBDropdownMenu className='dropdown-default '>
                  <Link to='profile' className='header-links'>
                    <MDBDropdownItem>Profile</MDBDropdownItem>
                  </Link>
                  <Link to='login' className='header-links'>
                    <MDBDropdownItem>Logout</MDBDropdownItem>
                  </Link>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarLink>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
