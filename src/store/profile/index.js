
import StoreModule from "../module";

/**
 * Детальная ифнормация о пользователе для страницы профиль
 */
class ProfileState extends StoreModule {

	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			userID: null,
			userToken: null,
			userEmail: null,
			isAuth: false,
			waiting: false,
			profileInfo: {},
			error: {
				message: '',
			}
		}
	}

	async logout() {
		// Сброс текущего профиля и установка признака ожидания загрузки
		this.setState({
			userID: null,
			userToken: null,
			userEmail: null,
			isAuth: false,
			waiting: true,
			profileInfo: {},
			error: {
				message: '',
			}
		});
		try {
			await fetch('/api/v1/users/sign', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-Token': localStorage.getItem('token')
				}
			});

		} catch (error) {
			console.error('Ошибка ' + error.name + ":" + error.message + "\n" + error.stack);
			// Ошибка при загрузке
			// @todo В стейт можно положить информацию об ошибке
			this.setState({
				userID: null,
				userToken: null,
				userEmail: null,
				isAuth: false,
				waiting: false,
				profileInfo: {},
				error: {
					message: '',
				}
			});
		} finally {
			this.setState({
				...this.getState(),
				waiting: false,
			});
		}
	}

	async getTokenUser(data) {
		// Сброс текущего профиля 
		this.setState({
			userID: null,
			userToken: null,
			userEmail: null,
			isAuth: false,
			waiting: true,
			profileInfo: {},
			error: {
				message: '',
			}
		});
		try {
			const response = await fetch('/api/v1/users/sign', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data)
			});
			const json = await response.json();

			if (response.status === 200) {
				localStorage.setItem('token', json.result.token);
			}

			this.setState({
				...this.getState(),
				userID: json.result.user._id,
				userEmail: json.result.user.email,
				profileInfo: json.result.user,
				userToken: json.result.token,
				isAuth: true,
				waiting: false
			}, 'Загружен Token из АПИ');
		}
		catch (error) {
			console.error('Ошибка ' + error.name + ":" + error.message + "\n" + error.stack);
			// Ошибка при загрузке
			// @todo В стейт можно положить информацию об ошибке
			this.setState({
				userID: null,
				userToken: null,
				userEmail: null,
				isAuth: false,
				waiting: false,
				profileInfo: {},
				error: { message: error.message.toString() }
			}, `Незагружен Token - у вас ошибка ${this.getState().error}`);
		}
	}

	async loadProfile() {
		// Сброс текущего профиля и установка признака ожидания загрузки
		this.setState({
			...this.getState(),
			waiting: true,
			profileInfo: {},
			error: {
				message: '',
			}
		});
		try {
			const response = await fetch('/api/v1/users/self', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Token': localStorage.getItem('token')
				}
			});
			const json = await response.json();
			console.log('загружаем данные на страницу профиля', response);
			if (response.status === 200) {
				this.setState({
					...this.getState(),
					profileInfo: json.result,
					isAuth: true,
					waiting: false
				}, 'Загружен Profile из АПИ');
			} else {
				this.setState({
					...this.getState(),
					isAuth: false,
					waiting: false
				}, 'Нету доступа к Profile из АПИ');
			}
		}
		catch (error) {
			console.error('Ошибка ' + error.name + ":" + error.message + "\n" + error.stack);
			// Ошибка при загрузке
			// @todo В стейт можно положить информацию об ошибке
			this.setState({
				...this.getState(),
				isAuth: false,
				waiting: false,
				profileInfo: {},
				error: { typeError: error.message.toString() }
			}, `Незагружен Token - у вас ошибка ${this.getState().error}`);
		}
	}

	resetError() {
		this.setState({
			...this.getState(),
			error: {
				message: '',
			}
		}, 'Обнуление ошибок');
	}
}

export default ProfileState;
