import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Form = ({ getToken, resetError, error, t }) => {

	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	const onChangeLogin = (event) => {
		setLogin(event.target.value);
	}
	const onChangePassword = (event) => {
		setPassword(event.target.value);
	}

	useEffect(() => {
		setLogin('');
		setPassword('');
		return (() => resetError())
	}, []);

	function onSubmitForm(event) {
		event.preventDefault();
		getToken({
			login,
			password
		});
		setLogin('');
		setPassword('');
	};

	const cn = bem('Form');
	return (
		<form className='Form'>
			<h2>{t('form.enter')}</h2>
			<label htmlFor='login'>{t('form.login')}</label>
			<input className={cn('input')} type='text' value={login} onChange={onChangeLogin} id='login' />
			<label htmlFor='pass'>{t('form.password')}</label>
			<input className={cn('input')} type='password' value={password} onChange={onChangePassword} id='password' />
			{error && <p className={cn('error')}>{error}</p>}
			<button className={cn('button')} onClick={onSubmitForm}>{t('buttonform.enter')}</button>
		</form>
	)
}
Form.propTypes = {
	error: PropTypes.string,
	value: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	getToken: PropTypes.func,
	resetError: PropTypes.func,
}

Form.defaultProps = {
	getToken: () => { },
	resetError: () => { },
	t: (text) => text,
	type: 'text',
	theme: ''
}

export default Form;