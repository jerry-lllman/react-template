import C from '@/components/C'

import './index.less'

function App() {
	const a = 1
	const b = '2' + a
	const jsx = <div className='node'>
		<img />
		{b}
		<C />
	</div>
	return jsx
}


export default App