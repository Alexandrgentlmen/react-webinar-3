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
	const { t } = useTranslate();
	const store = useStore();

	useInit(() => {
		store.actions.profile.loadProfile();
	}, []);
	const select = useSelector(state => ({
		waiting: state.profile.waiting,
		user: state.profile.profileInfo,
		isAuth: state.profile.isAuth,
	}));

	const callbacks = {
		getLogout: useCallback(() => store.actions.profile.logout(), [store]),
	};

	return (

		<SideLayout side='end'>
			<Spinner active={select.waiting}>
				{select.isAuth && <NavLink to='/profile'>{select.user?.profile?.name || select.user?.name}</NavLink>}
				<LoginBtn checkin={select.isAuth} getLogout={callbacks.getLogout} t={t} />
			</Spinner>
		</SideLayout>
	)
}

export default memo(ProfileNavigation);
