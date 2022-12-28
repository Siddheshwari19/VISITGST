import React, { useState, useEffect } from "react";

//All the svg files

import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IoMdClose } from 'react-icons/io';
import { FiLogOut, FiHome } from 'react-icons/fi';
import { AiOutlineSchedule, AiOutlineHistory } from 'react-icons/ai';
import { MdPlaylistAdd } from 'react-icons/md';
import { RiMenu3Fill } from 'react-icons/ri';
import Cookies from "js-cookie";
import Switch from '@mui/material/Switch';

import themeMain from '../../theme';
import { CircularProgress } from "@mui/material";
// import axiosInstance from "../../utilities/axios";
import { useWindowDimensions } from '../../utility/dimensions';
import axiosInstance from "../../utility/axios";
const Container = styled.div`
  position: fixed;
  z-index:10;
  .active {
   
    // font-weight:600;
    // color:#d0f0ff;
    background: #fff;
    color: ${themeMain.palette.primary.main};
    box-sizing: border-box;
    border: 1px solid ${themeMain.palette.primary.main};


    img {
      // color:#f9dd16;
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(110%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: ${themeMain.palette.primary.main};
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  &::before,
  &::after {
    content: "";
    background-color: #FFF;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }

  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: ${themeMain.palette.primary.main};
  width: ${(props) => (props.clicked ? (props.width > 1079 ? "21rem" : "15rem") : "7.5rem")};
  height:${(props) => (props.width > 1079 ? "90vh" : "100vh")};
  margin-top: ${(props) => (props.width > 1079 ? "1rem" : "0px")};
//   margin-left:${(props) => (props.width > 1079 ? "3.3rem" : "0px")};
  border-radius: ${(props) => (props.width > 1079 ? "0 20px 20px 0" : "0px")};
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease;
  overflow:scroll;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
}
`;

const Logo = styled.div`
    box-sizing: border-box;
    border: 1px solid ${themeMain.palette.primary.main};
    display: flex;
    background:transparent;
    width:100%;
    padding:5px 0;
    justify-content: center;
  img {
    // width: ${(props) => (props.clicked ? '100%' : '80%')};
    background: #FFF;
    border-radius: 10px;
    padding: 0.1em;
    height: 110px;
  }
`;

const SlickBar = styled.ul`
  color: #FFF;
  list-style: none;
  display: flex;
  width:100%;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
    padding: 2rem 0;

  position: absolute;
  top: 6rem;
  left: 0;

  // width: ${(props) => (props.clicked ? (props.width > 1079 ? "21rem" : "15rem") : "7.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  color: #FFF;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: flex;
  flexDirection:row;
  
  // padding-left: ${(props) => (props.clicked ? "4rem" : "0")};

  justify-content: ${(props) => (props.clicked ? "flex-start" : "center")};

  &:hover {
    // color: #d0f0ff;
    // font-weight:600;
    background: #FFF;
    color: ${themeMain.palette.primary.main};
    box-sizing: border-box;
    border: 1px solid ${themeMain.palette.primary.main};

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }


  img {
    width: 1.5rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Item2 = styled.div`
  text-decoration: none;
  color: #FFF;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;
  display: flex;
  flexDirection:row;
  
  // padding-left: ${(props) => (props.clicked ? "4rem" : "0")};

`;

const Item1 = styled.div`
  text-decoration: none;
  color: #FFF;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  border: 1px solid transparent;
  box-sizing: border-box;

  display: flex;
  flexDirection:row;
  
  // padding-left: ${(props) => (props.clicked ? "4rem" : "0")};

  justify-content:  center;



  img {
    width: 1.5rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;



const Text = styled.span`
  // width: ${(props) => (props.clicked ? "7.2em" : "0")};
  // width:7.2em;
  overflow: hidden;
  // font-weight:500;

  font-size:1.3em;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
 
`;

const Sidebar = (props) => {

  const { height, width } = useWindowDimensions();

  const [click, setClick] = useState(true);
  const [mobileView, setMobileView] = useState(false);
  const handleClick = () => setClick(!click);
  const [userType, setUserType] = useState();
  const [available,setAvailable] = useState();
  const [empName,setEmpName] = useState();
  React.useEffect(() => {
    axiosInstance.get(`/type-check`).then(res => {
      setUserType(res.data);
    }).catch(err => {
    });

  }, []);
  React.useEffect(() => {
    axiosInstance.get(`/get-emp-byid`).then(res => {
      setAvailable(res.data.status);
      setEmpName(res.data.name);
      // setUserType(res.data);
    }).catch(err => {
    });
  }, []);
  React.useEffect(() => {
    axiosInstance.post(`/update-status-emp`,{status:available}).then(res => {
      
    }).catch(err => {
    });


  }, [available]);


  const EmployeeMenuItems =
    <>
    <h3 style={{padding:'0.5em'}}>Welcome {empName}</h3>
      <Item onClick={() => { setMobileView(false) }} clicked={click}
        exact
        activeClassName="active"
        to="/employee-dashboard"
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>
          <FiHome size={24} />
          {!click ? <></> : <Text clicked={click}>Dashboard</Text>}
        </div>
      </Item>
      <Item onClick={() => { setMobileView(false) }} clicked={click}
        exact
        activeClassName="active"
        to="/view-appointments"
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>
          <AiOutlineSchedule size={24} />
          {!click ? <></> : <Text clicked={click}>Appointments</Text>}
        </div>
      </Item>


      <Item
        clicked={click}
        activeClassName="active"
        to="/view-requests"
        onClick={() => { setMobileView(false) }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>

          <MdPlaylistAdd size={24} />
          {!click ? <></> : <Text clicked={click}>Requests</Text>}
        </div>
      </Item>
      <Item
        clicked={click}
        activeClassName="active"
        to="/view-history"
        onClick={() => { setMobileView(false) }}
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>

          <AiOutlineHistory size={24} />
          {!click ? <></> : <Text clicked={click}>History</Text>}
        </div>
      </Item>
      <Item2
      >
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>

          <Switch color="warning"  checked={available=='available'} onChange={(e) => {
            setAvailable(e.target.checked?'available':'unavailable');
          }} />
          {!click ? <></> : <Text clicked={click}>Available</Text>}

          {/* <h3></h3> */}
        </div>
      </Item2>
    </>;
  return (
    <>
      {!mobileView && width <= 1079 ? <RiMenu3Fill onClick={() => {
        setClick(true);
        setMobileView(true);
      }} style={{ position: 'absolute', cursor: 'pointer', top: '13px', right: '12px', zIndex: '10', color: themeMain.palette.primary.light, background: themeMain.palette.primary.main, padding: '5px', borderRadius: '5px' }} size={30} /> : <></>}

      <Container>
        {mobileView || width > 1079 ? <SidebarContainer width={width} clicked={click}>

          <Logo clicked={click}>
            <h1 style={{ color: '#FFF' }}>VISIT GST</h1>
            {/* <img src={logo} alt="logo" /> */}
          </Logo>

          <SlickBar clicked={click}>

            {userType&&available&&empName ? EmployeeMenuItems :
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <CircularProgress style={{ color: 'green', justifyContent: 'center' }} />
              </div>}
            <Item
              clicked={click}
              // style={{cursor:'pointer'}}
              to='/'
              activeClassName="active"
              onClick={() => {
                Cookies.remove('access_token');
                window.location.replace('/');
                setMobileView(false)
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginLeft: click ? '2rem' : '0' }}>

                <FiLogOut size={24} />
                {!click ? <></> : <Text clicked={click}>Logout</Text>}
              </div>
            </Item>
            <Item1
              clicked={click}
              onClick={() => {
                if (width > 1079) {
                  handleClick()
                } else {
                  setMobileView(false);

                }
              }}
            >

              {!click ? <RiMenu3Fill size={24} /> : <IoMdClose size={24} />}


            </Item1>

          </SlickBar>

        </SidebarContainer> : <></>}
      </Container>
    </>
  );
};

export default Sidebar;
