import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import emojiList from "./emojiList.json";
import App from './App'
import userEvent from '@testing-library/user-event';
describe('Emoji Test', () => {
    // render App component before each test
    beforeEach(() => {
        render(<App />)
    })

    // test if emoji list is rendered correctly
    test("emoji list render", () => {
        let emojies = emojiList.slice(0, 20);
        emojies.map((item) => {
            expect(screen.getByText(item.title)).toBeInTheDocument()
        })
    })


    // test if clicking an emoji copies it to clipboard
    test("copy to clickboard test", () => {
        let listElement = screen.getByText("Grinning")
        userEvent.click(listElement)
        expect(listElement.parentElement.getAttribute("data-clipboard-text")).toMatch("😀")
    })

    // test if HeaderComponent is present in the document
    test('Document should be have HeaderComponent', () => {
        let headerComp = screen.getByText("Emoji Search")
        expect(headerComp).toBeInTheDocument()
    });

    // test if search filter works and renders correct results
    test("render after filter", () => {
        let searchInput = screen.getByLabelText("testinput")
        const value = "Grinning"
        userEvent.type(searchInput, value)
        expect(screen.getByText(value)).toBeInTheDocument();
    })


})