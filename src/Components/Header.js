import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router'

const Header = ({ title, onAdd,showAdd }) => {
const location=useLocation()
    return (
        <header className='header'>
            <h1>{title}</h1>
           {location.pathname==='/'&&(<Button 
            color={showAdd?'Red':'Green'} 
            text={showAdd?'Close':'Add'} 
            onClick={onAdd}>
            </Button>)} 
        </header>
    )
}

export default Header

