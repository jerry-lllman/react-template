import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(<RouterProvider router={router} />)

// const a = 1
// console.log(a as number)
