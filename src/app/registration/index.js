import { memo, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Form from "../../components/form";
import LocaleSelect from "../../containers/locale-select";
import ProfileNavigation from '../../containers/profile-navigation';

function Registration() {
	const store = useStore();
	const { t } = useTranslate();
	const navigate = useNavigate();
	const location = useLocation();
	const fromPage = location.state?.from?.pathname || '/';
	const select = useSelector(state => ({
		error: state.profile.error.message,
		isAuth: state.profile.isAuth,
	}));


	const callbacks = {

		// получить Token
		getToken: useCallback((login, password) => store.actions.profile.getTokenUser(login, password), [store]),

		// снять ошибки
		resetError: useCallback(() => store.actions.profile.resetError(), [store]),
	}

	useEffect(() => { select.isAuth && navigate(fromPage, { replace: true }) }, [select.isAuth])

	return (
		<PageLayout>
			<ProfileNavigation />
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<Form
				getToken={callbacks.getToken}
				t={t}
				resetError={callbacks.resetError}
				error={select.error}
			/>
		</PageLayout>
	);
}

export default memo(Registration);
