import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit'
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdbreact'

import { addactiveUser } from 'redux/reducer'

import './header.css'

const Header = () => {
  const [showNavText, setShowNavText] = useState(false)

  const activeUser = useSelector(state => state.billSplitApp.activeUser)
  const disptach = useDispatch()

  const activeUserName = (
    <MDBDropdownToggle nav caret className='navbar-text drop-down'>
      <div className='d-none d-md-inline box-text label'>{activeUser?.name}</div>
    </MDBDropdownToggle>
  )

  const loginTag = (
    <Link to='login' className='header-links login-btn label'>
      Login
    </Link>
  )

  const deleteActiveUser = () => {
    disptach(addactiveUser({}))
  }

  return (
    <div className='row'>
      <MDBNavbar expand='lg' dark bgColor='success'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='label'>Split Order</MDBNavbarBrand>
          <MDBNavbarToggler
            className='bg-black border-4 border-dark'
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
                <Link to='/' className='label header-links text-light me-2'>
                  Home
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='usercard' className='label header-links text-light me-2'>
                  Split Bill
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='totalbill' className='label header-links text-light'>
                  Total Bill
                </Link>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBDropdown>
              {activeUser?.name ? activeUserName : loginTag}
              <MDBDropdownMenu className='dropdown-default'>
                <Link to='profile' className='header-links'>
                  <MDBDropdownItem>Profile</MDBDropdownItem>
                </Link>
                <Link to='login' className='header-links'>
                  <MDBDropdownItem onClick={deleteActiveUser}>Logout</MDBDropdownItem>
                </Link>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}

export default Header
