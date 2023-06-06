import { memo, useCallback } from 'react';
import { useParams } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LoginBtn from "../../components/login-btn";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";

function Article() {
	const store = useStore();
	const { t } = useTranslate();
	const params = useParams();

	useInit(() => {
		store.actions.article.load(params.id);
	}, [params.id]);

	const select = useSelector(state => ({
		article: state.article.data,
		waiting: state.article.waiting,
		userToken: state.profile.userToken,
	}));

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		// разлогинится Token
		checkout: useCallback(() => store.actions.profile.checkout(), [store]),
	}

	return (
		<PageLayout>
			<LoginBtn checkin={select.userToken} checkout={callbacks.checkout} />
			<Head title={select.article.title}>
				<LocaleSelect />
			</Head>
			<Navigation />
			<Spinner active={select.waiting}>
				<ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
			</Spinner>
		</PageLayout>
	);
}

export default memo(Article);
