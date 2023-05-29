import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import SpinnerLoader from '../../components/spinner-loader';
import Pagination from '../../components/pagination';
import Menu from '../../components/menu';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

import Basket from '../basket';

function Main() {
	const store = useStore();
	const select = useSelector(state => ({
		list: state.catalog.list,
		amount: state.basket.amount,
		sum: state.basket.sum,
		quantityPages: state.catalog.pagination.quantityPages,
		currentPage: state.catalog.pagination.currentPage,
		loading: state.catalog.pagination.loading,
		pageSize: state.catalog.pagination.pageSize,
		activeModal: state.modals.name,
	}));

	useEffect(() => {
		store.actions.catalog.loadProduct();
	}, []);

	useEffect(() => {
		store.actions.catalog.loadPages();
		store.actions.catalog.load(select.currentPage, select.pageSize);
	}, [select.currentPage]);

	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		// Устанавливаем нужную страницу в пагинации
		setCurrentPage: useCallback(currentPage => store.actions.catalog.setCurrentPage(currentPage), [store]),
	}

	const renders = {
		item: useCallback((item) => {
			return <Item item={item} onAdd={callbacks.addToBasket} />
		}, [callbacks.addToBasket]),
	};

	return (
		<PageLayout>
			<Head title='Магазин' />
			<Menu />
			<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
				sum={select.sum} />
			{select.loading ?
				<List list={select.list} renderItem={renders.item} /> :
				<SpinnerLoader />
			}
			<Pagination
				quantityPages={select.quantityPages}
				currentPage={select.currentPage}
				onClickPage={callbacks.setCurrentPage}
			/>
			{select.activeModal === 'basket' && <Basket />}
		</PageLayout>

	);
}

export default memo(Main);
