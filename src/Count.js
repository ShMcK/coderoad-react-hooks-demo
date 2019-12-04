import React, { useState } from "react"

const Count = ({ initialCount }) => {
  const useCounter = initialCount => {
    const [count, setCount] = useState(initialCount)
    return {
      value: count,
      increase: () => setCount(count + 1),
      decrease: () => setCount(count - 1),
      reset: () => {/* reset count to initial count */}
    }
	}
	
	const counter = useCounter(initialCount)

	return (
		<>
			<span>Count: {counter.value}</span>
			<br />
			<br />
			<button onClick={counter.reset}>Reset</button>
			<button onClick={counter.increase}>+</button>
			<button onClick={counter.decrease}>-</button>
		</>
	)
}

export default Count