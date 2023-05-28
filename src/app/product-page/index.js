import { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductInfo from '../../components/product-info';
import Menu from '../../components/menu';
import Basket from '../basket';



function ProductPage() {
	const store = useStore();
	const { id } = useParams();
	const select = useSelector(state => ({
		amount: state.basket.amount,
		sum: state.basket.sum,
		productInfo: state.catalog.productInfo,
		activeModal: state.modals.name,
	}));

	useEffect(() => {

		store.actions.catalog.loadCurrentProduct(id);

	}, [id]);

	console.log('productInfo', select.productInfo);


	const callbacks = {
		// Добавление в корзину
		addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
		// Открытие модалки корзины
		openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
		// Запрос товара с сервака и добавление в корзину
		addToBasketApi: useCallback(_id => store.actions.basket.addToBasketApi(_id), [store]),
	}

	return (
		<PageLayout>
			<Head title={select.productInfo.title} />
			<Menu />
			<BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
				sum={select.sum} />
			<ProductInfo productInfo={select.productInfo} onAdd={callbacks.addToBasketApi}></ProductInfo>
			{select.activeModal === 'basket' && <Basket />}
		</PageLayout>

	);
}

export default memo(ProductPage);
