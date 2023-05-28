import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

	constructor(store, name) {
		super(store, name);
		this.generateCode = codeGenerator(0)
	}

	initState() {
		return {
			list: [],
			pagination: {
				pageSize: 10,
				quantityItems: 0,
				loading: false,
				quantityPages: 0,
				currentPage: 1,
			},
			productInfo: {},
		}
	}
	offLoader() {
		this.setState({
			...this.getState(),
			pagination: {
				...this.getState().pagination,
				loading: false,
			}
		}, 'выключаем лоадер после загрузки');
	}

	setCurrentPage(currentPage) {

		if (typeof currentPage === 'number') {
			this.setState({
				...this.getState(),
				pagination: {
					...this.getState().pagination,
					currentPage: currentPage,
				}
			}, 'Выбор страницы пагинации');
		}
	}

	/**
	* Добавление товара в корзину
	* @param _id Код товара
	*/
	// http://example.front.ylab.io/api/v1/articles/646b6e1fe1626c0bd8518064?fields=*,madeIn(title,code),category(title)
	// async loadCategoryAndCountry(_id) {
	// 	const responseMadeIn = await fetch(`/api/v1/articles/${_id}?fields=madeIn(title,code)`);
	// 	const responseCat = await fetch(`/api/v1/articles/${_id}?fields=category(title)`);

	// 	const MadeIn = await responseMadeIn.json();
	// 	const Cat = await responseCat.json();

	// 	this.setState({
	// 		...this.getState(),
	// 		productInfo: { ...json.result }
	// 	}, 'Загружен продукт из АПИ');
	// }

	async loadCurrentProduct(_id) {
		const response = await fetch(`/api/v1/articles/${_id}`);
		const responseMadeIn = await fetch(`/api/v1/articles/${_id}?fields=madeIn(title,code)`);
		const responseCat = await fetch(`/api/v1/articles/${_id}?fields=category(title)`);

		const MadeIn = await responseMadeIn.json();
		const Cat = await responseCat.json();
		console.log('loadCurrentProduct MadeIn', MadeIn.result)
		console.log('loadCurrentProduct Cat', Cat.result)
		const json = await response.json();
		const countryTitle = MadeIn.result.madeIn.title;
		const countryCode = MadeIn.result.madeIn.code;
		const categoryProduct = Cat.result.category.title;
		this.setState({
			...this.getState(),
			productInfo: { ...json.result, countryTitle: countryTitle, categoryProduct: categoryProduct, countryCode: countryCode }
		}, 'Загружен продукт из АПИ');
	}

	async load(currentPage, pageSize) {
		const skipNumber = currentPage * 10;
		const response = await fetch(`/api/v1/articles?limit=${pageSize}&skip=${skipNumber}`);
		const json = await response.json();

		this.setState({
			...this.getState(),
			list: json.result.items
		}, 'Загружены товары из АПИ');
	}

	async loadPages() {

		const response = await fetch('/api/v1/articles?limit=*');
		const json = await response.json();
		const allItemsQuant = json.result.items.length;

		this.setState({
			...this.getState(),
			pagination: {
				...this.getState().pagination,
				quantityItems: allItemsQuant,
				quantityPages: Math.ceil(allItemsQuant / this.getState().pagination.pageSize) - 1,
				loading: true,
			}
		}, 'Загружены из АПИ все товары');
	}
}

export default Catalog;
