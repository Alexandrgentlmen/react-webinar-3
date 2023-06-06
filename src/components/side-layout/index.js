import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout({ children, side, padding, wrap }) {
	const cn = bem('SideLayout');
	return (
		<div className={cn({ side, padding, wrap })}>
			{React.Children.map(children, (child) => (
				<div key={child.key} className={cn('item')}>{child}</div>
			))}
		</div>
	);
}

SideLayout.propTypes = {
	children: PropTypes.node,
	side: PropTypes.oneOf(['start', 'end', 'between']),
	padding: PropTypes.oneOf(['small', 'medium']),
	wrap: PropTypes.oneOf(['on', 'off']),
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
