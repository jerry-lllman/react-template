import ReactDOM from 'react-dom/client'
import App from './App'

console.log(App)

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(<App />)

// const a = 1
// console.log(a as number)
