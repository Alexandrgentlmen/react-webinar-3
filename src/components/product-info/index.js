import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';

function ProductInfo(props) {

	const cn = bem('ProductInfo');

	const callbacks = {
		onAdd: (e) => props.onAdd(props.productInfo._id)
	}

	return (
		<div className={cn()}>
			<p className={cn('title')}>
				{props.productInfo.description}
			</p>
			<p className={cn('title')}>
				Страна производитель: <b>{props.productInfo.countryTitle} ({props.productInfo.countryCode})</b>
			</p>
			<p className={cn('title')}>
				Категории: <b>{props.productInfo.categoryProduct}</b>
			</p>
			<p className={cn('title')}>
				Год выпуска: <b>{props.productInfo.edition}</b>
			</p>
			<p className={cn('title')}>
				<b className={cn('title_big')}>Цена:&nbsp;&nbsp;{numberFormat(props.productInfo.price)} ₽</b>
			</p>
			<div className={cn('actions')}>

				<button onClick={callbacks.onAdd}>Добавить</button>
			</div>
		</div>
	);
}

ProductInfo.propTypes = {
	productInfo: PropTypes.shape({
		_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string,
		price: PropTypes.number
	}).isRequired,
	onAdd: PropTypes.func,
};

ProductInfo.defaultProps = {
	onAdd: () => { },
}

export default memo(ProductInfo);
