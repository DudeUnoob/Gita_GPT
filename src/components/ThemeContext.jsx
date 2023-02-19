
import React, { useState, useEffect, useContext, createContext } from 'react';

export const ThemeContext = React.createContext()
export const ThemeUpdateContext = React.createContext()

export function useTheme(){
    return useContext(ThemeContext)
}

export function useThemeUpdate(){
   
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
    const [darkTheme, setDarkTheme] = useState(() => {
        try {
            const storedTheme = localStorage.getItem("theme");
        
            return storedTheme !== null  ? JSON.parse(storedTheme) : false
        } catch(e) {
            
        }
        
    })

   useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkTheme))
   }, [darkTheme])
   
    function toggleTheme () {
        setDarkTheme(prevDarkTheme => !prevDarkTheme)
    }
    
    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
            {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}