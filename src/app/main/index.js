import { memo } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileNavigation from '../../containers/profile-navigation';
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

function Main() {

	const store = useStore();

	useInit(() => {
		// загрузим все товары
		store.actions.catalog.initParams();
		// загрузим все категории для category array
		store.actions.categories.loadAllCategory();
	}, [], true);

	const { t } = useTranslate();

	return (
		<PageLayout>
			<ProfileNavigation />
			<Head title={t('title')}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<CatalogFilter />
			<CatalogList />
		</PageLayout>
	);
}

export default memo(Main);
