import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import UpComing from '../pages/UpComing';
import Popular from '../pages/Popular';
import AiringToday from '../pages/tv/AiringToday';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaRegWindowClose } from 'react-icons/fa';
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CForm,
  CFormInput,
  CButton,
} from '@coreui/react';
import './Navbar.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
const Navbar = () => {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hanldeRoute = (evt) => {
    evt.preventDefault();
    console.log(evt);
    navigate(evt.target.pathname);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
  };

  return (
    <>
      <CNavbar
        expand="lg"
        colorScheme="dark"
        className="bg-drak"
        placement="fixed-top"
      >
        <CContainer fluid>
          <CNavbarBrand href="#">Movie/Tv Portal</CNavbarBrand>
          <CNavbarToggler onClick={() => setVisible(!visible)} />
          <CCollapse className="navbar-collapse" visible={visible}>
            <CNavbarNav>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Movie</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/" onClick={hanldeRoute}>
                    TopRated
                  </CDropdownItem>
                  <CDropdownItem href="/Popular" onClick={hanldeRoute}>
                    Popular
                  </CDropdownItem>
                  <CDropdownItem href="/Upcoming" onClick={hanldeRoute}>
                    Upcoming
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
            <CNavbarNav>
              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Tv Series</CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem href="/AiringToday" onClick={hanldeRoute}>
                    Airing Today
                  </CDropdownItem>
                  <CDropdownItem href="/OnTheAir" onClick={hanldeRoute}>
                    On the Air
                  </CDropdownItem>
                  <CDropdownItem href="/PopularTv" onClick={hanldeRoute}>
                    Popular
                  </CDropdownItem>
                  <CDropdownItem href="/TopRateTv" onClick={hanldeRoute}>
                    Top Rated Tv Shows
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </CNavbarNav>
          </CCollapse>
        </CContainer>
      </CNavbar>
    </>
  );
};

export default Navbar;
