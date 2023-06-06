import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from '../../hooks/use-translate';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import UserCard from "../../components/user-card";
import LocaleSelect from "../../containers/locale-select";
import ProfileNavigation from '../../containers/profile-navigation';


function Profile() {
	const store = useStore();
	const { t } = useTranslate();
	useInit(() => {
		// надо написать загрузку профиля при входе на эту сраницу 
		store.actions.profile.loadProfile();
	}, []);

	const select = useSelector(state => ({
		userInfo: state.profile.profileInfo,
		waiting: state.profile.waiting,
	}));
	console.log('select.userInfo', select.userInfo)
	return (
		<PageLayout>
			<ProfileNavigation />
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<Spinner active={select.waiting}>
				<UserCard userInfo={select.userInfo} t={t} />
			</Spinner>
		</PageLayout>
	);
}

export default memo(Profile);
