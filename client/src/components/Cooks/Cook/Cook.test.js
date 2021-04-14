import {BrowserRouter} from 'react-router-dom'
import { render } from '@testing-library/react'
import React from 'react'


import Cook from './Cook'


describe('Cook component', () => {
    it('Should display username', () => {
        render(<BrowserRouter><Cook username="pesho" recipes={5}/></BrowserRouter>)
        expect(document.querySelector('p').textContent).toBe('@pesho')
    })

    it('Should display recipe\'s count', () => {      
        render(<BrowserRouter><Cook recipes={5}/></BrowserRouter>)
        expect(document.querySelector('.icon span').textContent).toBe('5 recipes')
    })

})