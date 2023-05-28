/**
 * Базовый класс для модулей хранилища
 * Для гурппировки действий над внешним состоянием
 */
class StoreModule {

	constructor(store, name) {
		this.store = store;
		this.name = name;
	}

	initState() {
		return {}
	}
	// метод получения текущего состояния - своего модуля
	getState() {
		return this.store.getState()[this.name];
	}

	setState(newState, description = 'setState') {
		this.store.setState({
			...this.store.getState(),
			[this.name]: newState
		}, description)
	}

}

export default StoreModule;
