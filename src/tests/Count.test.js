import React from 'react'
import Count from '../Count'

// react-testing-library
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

const countRegex = /^Count: (-?[0-9]+)/

function getCount(htmlString) {
	const text = htmlString.textContent
	const count = countRegex.exec(text)[1]
	return Number(count)
}


test('should increment count on + press', () => {
  const {queryByText} = render(
    <Count initialCount={0} />
	)
	
	const counter = queryByText(countRegex)
	expect(getCount(counter)).toBe(0)
	
	// increment count
	fireEvent.click(queryByText('+'))
	const clickedCounter = queryByText(countRegex)
	
	expect(getCount(clickedCounter)).toBe(1)
})

test('should decrement count on - press', () => {
  const {queryByText} = render(
    <Count initialCount={0} />
	)
	
	const counter = queryByText(countRegex)
	expect(getCount(counter)).toBe(0)
	
	// increment count
	fireEvent.click(queryByText('-'))
	const clickedCounter = queryByText(countRegex)
	
	expect(getCount(clickedCounter)).toBe(-1)
})
