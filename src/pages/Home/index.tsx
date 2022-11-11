import A from '@/components/A';
import C from '@/components/C';
import { Link } from 'react-router-dom';

export default function Home() {
	return <div>
		<div>Home</div>
		<A />
		<C />
		<Link to={'/test'}>Test</Link>
		</div>
}