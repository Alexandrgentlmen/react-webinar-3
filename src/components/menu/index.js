import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn as bem } from '@bem-react/classname';
import './style.css';


function Menu() {
	const cn = bem('Menu');
	return (
		<div className={cn()}>
			<Link className={cn('link_main')} to="/">Главная</Link>
		</div>
	);
}
export default memo(Menu);
