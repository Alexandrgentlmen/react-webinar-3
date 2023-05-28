import { memo, useEffect, useState } from 'react';
import './style.css';
import { generateRandomString } from '../../utils';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

const dotsLeft = ' ... ';
const dotsRight = ' ... ';

function Pagination(props) {
	const numOfPage = [];
	for (let i = 1; i <= props.quantityPages; i++) {
		numOfPage.push(i)
	};
	const cn = bem('Pagination');
	const [arrAtCurrentBtn, setArrAtCurrentBtn] = useState([numOfPage]);

	useEffect(() => {

		let newPages = [...numOfPage];
		if (props.currentPage >= 1 && props.currentPage <= 2) {
			newPages = [1, 2, 3, dotsLeft, props.quantityPages];
		};
		if (props.currentPage === 3) {
			newPages = [1, 2, 3, 4, dotsLeft, props.quantityPages];
		};
		if (props.currentPage > 3 && props.currentPage < props.quantityPages - 2) {
			const slicedArrTo = newPages.slice(props.currentPage - 2, props.currentPage);
			const slicedArrFrom = newPages.slice(props.currentPage, props.currentPage + 1);
			newPages = ([1, dotsLeft, ...slicedArrTo, ...slicedArrFrom, dotsRight, props.quantityPages]);
		};
		if (props.currentPage > props.quantityPages - 3) {
			const slicedArrFrom = newPages.slice(props.currentPage - 2);
			newPages = ([1, dotsRight, ...slicedArrFrom]);
		};
		if (props.currentPage === dotsLeft || props.currentPage === dotsRight) {
			setArrAtCurrentBtn(arrAtCurrentBtn);
		};
		setArrAtCurrentBtn(newPages);
	}, [props.currentPage, props.quantityPages])

	return (
		<div className={cn()}>
			{arrAtCurrentBtn.map(item => {

				if (typeof item === 'number') {
					return <span
						onClick={() => {
							props.onClickPage(item);
						}}
						key={generateRandomString()}
						className={props.currentPage === item ?
							cn('item_active') : cn('item')}>
						{item}
					</span>
				} else if (typeof item === 'string') {
					return <span
						onClick={() => {
							props.onClickPage(item);
						}}
						key={generateRandomString()}
						className={cn('disabled')}>
						{item}
					</span>
				}

			})}
		</div>
	);
}

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	quantityPages: PropTypes.number.isRequired,
	onClickPage: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
	onClickPage: (item) => { },
}


export default memo(Pagination);
