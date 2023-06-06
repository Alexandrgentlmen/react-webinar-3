import { NavLink } from "react-router-dom";
import { memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import LoginBtn from "../../components/login-btn";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";

function ProfileNavigation() {
	const store = useStore();
	const token = localStorage.getItem('token');
	useInit(() => {
		// надо написать загрузку профиля при входе на эту сраницу 
		store.actions.profile.loadProfile();
	}, []);
	const select = useSelector(state => ({
		waiting: state.profile.waiting,
		user: state.profile.profileInfo
	}));
	console.log('select.user', select.user.profile);
	const callbacks = {
		// разлогинится Token
		getLogout: useCallback(() => store.actions.profile.logout(), [store]),

	};

	const { t } = useTranslate();

	return (

		<SideLayout side='end'>
			<Spinner active={select.waiting}>
				{token && <NavLink to='/profile'>{select.user.name}</NavLink>}
				<LoginBtn checkin={token} getLogout={callbacks.getLogout} t={t} />
			</Spinner>
		</SideLayout>
	)
}

export default memo(ProfileNavigation);

