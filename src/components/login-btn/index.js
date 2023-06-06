import { memo } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './style.css';

function LoginBtn({ checkin, getLogout, t }) {
	const navigate = useNavigate();
	return (
		<div className='LoginBtn'>
			{!checkin ?
				<button onClick={() => navigate('/login')}>{t('button.enter')}</button> :
				<button onClick={() => getLogout()}>{t('button.out')}</button>
			}
		</div>
	)
}

LoginBtn.propTypes = {
	getLogout: PropTypes.func,
	checkin: PropTypes.string
};

LoginBtn.defaultProps = {
	getToken: () => { }
}

export default memo(LoginBtn);
