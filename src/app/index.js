import Main from './main';
import ProductPage from './product-page';
import NotFound from '../components/not-found';
import { Route, Routes } from 'react-router-dom';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
	return (

		<Routes>
			<Route path='' element={<Main />} />
			<Route path='/product/:id' element={<ProductPage />} />
			<Route path='*' element={<NotFound />} />
		</Routes>

	);
}

export default App;
