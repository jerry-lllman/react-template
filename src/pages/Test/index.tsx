import A from '@/components/A';
import C from '@/components/C';
import { Link } from 'react-router-dom';

export default function Test() {
	return <div>
		<div>Test</div>
		<A />
		<C />
		<Link to={'/'}>Home</Link>
	</div>
}