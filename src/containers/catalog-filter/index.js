import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import Input from "../../components/input";
import SideLayout from "../../components/side-layout";

function CatalogFilter() {
	const [optionsCategory, setOptionsCategory] = useState('');
	// загрузим все категории для category array
	useEffect(() => {
		setOptionsCategory(store.actions.catalog.loadAllProducts());
		console.log(optionsCategory);
	}, [])

	const store = useStore();

	const select = useSelector(state => ({
		sort: state.catalog.params.sort,
		query: state.catalog.params.query,
		allCategory: state.catalog.allCategory,
		category: state.catalog.params.category,
	}));

	const callbacks = {
		// Сортировка
		onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
		// Сортировка категорий
		onCategory: useCallback(category => store.actions.catalog.setParams({ category }), [store]),
		// Поиск
		onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
		// Сброс
		onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),

	};

	const options = {
		sort: useMemo(() => ([
			{ value: 'order', title: 'По порядку' },
			{ value: 'title.ru', title: 'По именованию' },
			{ value: '-price', title: 'Сначала дорогие' },
			{ value: 'edition', title: 'Древние' },
		]), []),
	};

	const { t } = useTranslate();

	return (
		<SideLayout padding='medium'>
			<Select options={select.allCategory} value={select.category} onChange={callbacks.onCategory} />
			<Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
			<Input value={select.query} onChange={callbacks.onSearch} placeholder={'Поиск'}
				delay={1000} />
			<button onClick={callbacks.onReset}>{t('filter.reset')}</button>
		</SideLayout>
	)
}

export default memo(CatalogFilter);
