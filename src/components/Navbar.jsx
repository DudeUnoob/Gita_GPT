import  { useState, useEffect, createContext, useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import img from "../../public/gita_gpt.png"
import { ThemeContext, ThemeProvider, useTheme, useThemeUpdate } from './ThemeContext';

export default function Navigation () {
    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()
    // const [theme, setTheme] = useState("light")
    // const handleTheme = () => {
    //   return theme == "light" ? setTheme("dark") : setTheme("light")
    // }
    

    return (
        <>
        {/* bg="dark" variant="dark" */}
        
        <Navbar className='navbar_render' bg={darkTheme == true ? "dark" : "light"} variant={darkTheme == true ? "dark" : "light"}>
        <Container >
          <Navbar.Brand href="/">
            <img
              alt=""
              src={img}
              width="30"
              height="30"
              style={{borderRadius:"50%"}}
              className="d-inline-block align-top"
            />{' '}
            Gita GPT
          </Navbar.Brand>
          <Nav.Link>
            <Button variant='light' onClick={toggleTheme}>Dark</Button>
          </Nav.Link>
        </Container>
      </Navbar>
      
        </>
    )
}