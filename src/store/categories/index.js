import { parseLevel, parseTree } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра исписок товара
 */
class CategoriesState extends StoreModule {

	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			allCategory: [],
		}
	}

	/**
	 * Инициализация параметров.
	 * Восстановление из адреса
	 * @param [newParams] {Object} Новые параметры
	 * @return {Promise<void>}
	 */

	async loadAllCategory() {
		let flatList = [];
		try {
			const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
			const json = await response.json();
			flatList = [...json.result.items]
		}
		catch (error) {
			console.error('Ошибка ' + error.name + ":" + error.message + "\n" + error.stack);
		}

		const treeList = flatList.map((flatNode) => ({
			...flatNode,
			children: [],
		}));

		const myCategoryArr = parseLevel(treeList);
		const allCategory = myCategoryArr.reduce((acc, item) => {

			return [...acc, ...parseTree(item)]
		}, []);

		this.setState({
			...this.getState(),
			allCategory: [
				{ id: '0', title: 'Все', parent: null },
				...allCategory,
			],
		}, 'Установлены уровни в селекте каталога');
	}
}

export default CategoriesState;
