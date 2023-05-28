import { cn as bem } from '@bem-react/classname';
import './style.css';

function NotFound() {

	const cn = bem('NotFound');

	return (
		<>
			<span className={cn()}>Нет такого продукта</span>
		</>
	)
}


export default NotFound;
