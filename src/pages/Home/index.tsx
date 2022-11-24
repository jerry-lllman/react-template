
import { Link } from 'react-router-dom';

export default function Home() {
	return <div>
		<div>Home</div>
		<Link to={'/test'}>Test</Link>
	</div>
}