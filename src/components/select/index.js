import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {

	const onSelect = (e) => {
		props.onChange(e.target.value);
	};

	return (
		<select className="Select" value={props.value} onChange={onSelect}>
			{props.options.map(item => (
				<option
					key={item.value ? item.value : item.id}
					value={item.value ? item.value : item.id}>
					{item.level == null && item.title}
					{item.level == 0 && item.title}
					{item.level == 1 && '-' + item.title}
					{item.level == 2 && '--' + item.title}
					{item.level == 3 && '---' + item.title}
				</option>
			))
			}
		</select >
	)
}

Select.propTypes = {
	options: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string
	})).isRequired,
	value: PropTypes.any,
	onChange: PropTypes.func
};

Select.defaultProps = {
	onChange: () => { }
}

export default memo(Select);
