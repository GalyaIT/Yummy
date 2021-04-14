import {BrowserRouter} from 'react-router-dom'
import { render } from '@testing-library/react'
import React from 'react'


import Recipe from './Recipe'


describe('Recipe component', () => {
    it('Should display title', () => {
        render(<BrowserRouter><Recipe title="Cake" /></BrowserRouter>)
        expect(document.querySelector('.recipe-card__description h4').textContent).toBe('Cake')
    })
    it('Should display description', () => {
        render(<BrowserRouter><Recipe description="This is my favorite cake" /></BrowserRouter>)
        expect(document.querySelector('.recipe-card__description p').textContent).toBe('This is my favorite cake')
    })
    it('Should display likes', () => {
        render(<BrowserRouter><Recipe likes={5}/></BrowserRouter>)
        expect(document.querySelector('.recipe-card__statistic > div:nth-child(1) > p > span').textContent).toBe('5 likes')
    })
    it('Should display favorites', () => {
        render(<BrowserRouter><Recipe favorites={5}/></BrowserRouter>)
        expect(document.querySelector('.recipe-card__statistic > div:nth-child(2) > p > span').textContent).toBe('5 favorite')
    })
    it('Should display creator', () => {
        render(<BrowserRouter><Recipe creator="Pesho"/></BrowserRouter>)
        expect(document.querySelector('.recipe-card__statistic > div:nth-child(4) > p > span').textContent).toBe('Pesho')
    })

    
})