import { cn as bem } from "@bem-react/classname";
import './style.css';

function SpinnerLoader() {

	const cn = bem('loader');

	return (
		<>
			<span className={cn()}></span>
		</>
	)
}


export default SpinnerLoader;
