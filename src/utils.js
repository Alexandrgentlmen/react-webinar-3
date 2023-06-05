/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
	// Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
	// В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
	// В английском 2 формы: 'one', 'other'
	const key = new Intl.PluralRules(locale).select(value);
	// Возвращаем вариант по ключу, если он есть
	return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
	return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
	return new Intl.NumberFormat(locale, options).format(value);
}

export function parseLevel(treeList) {
	const categoriesIdsByIndex = {};
	const roots = [];
	let children;

	for (let i = 0; i < treeList.length; i++) {
		categoriesIdsByIndex[treeList[i]._id] = i;
		treeList[i].children = [];
	};
	for (let i = 0; i < treeList.length; i++) {

		children = { ...treeList[i], level: 0 };
		if (children.parent) {
			children.level++;
			treeList[categoriesIdsByIndex[children.parent._id]].children.push(children);
		} else {
			roots.push(children);
		}
	};
	return roots;
};

export function parseTree(tree) {
	const result = [];
	const stack = [{ treeList: tree, level: 0 }];

	while (stack.length !== 0) {
		const current = stack.shift();
		if (current) {
			result.push({
				title: current.treeList.title,
				level: current.level,
				id: current.treeList._id
			});
			if (current.treeList.children) {
				stack.unshift(
					...current.treeList.children.map((treeList) => ({
						treeList,
						level: current.level + 1,
						id: current.treeList._id,
					})),
				);
			}
		}
	}
	return result;
}