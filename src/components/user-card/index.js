import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UserCard({ userInfo, t }) {
	const cn = bem('UserCard');
	return (
		<div className={cn()}>
			<div className={cn('description')}>{t('profile.title')}</div>
			<div className={cn('prop')}>
				<div className={cn('label')}>{t('profile.name')}:</div>
				<div className={cn('value')}>{userInfo.profile?.name}</div>
			</div>
			<div className={cn('prop')}>
				<div className={cn('label')}>{t('profile.telefone')}:</div>
				<div className={cn('value')}>{userInfo.profile?.phone}</div>
			</div>
			<div className={cn('prop')}>
				<div className={cn('label')}>email:</div>
				<div className={cn('value')}>{userInfo?.email}</div>
			</div>
		</div>
	);
}

UserCard.propTypes = {
	userInfo: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
		telefone: PropTypes.string
	}).isRequired,
};

export default memo(UserCard);
