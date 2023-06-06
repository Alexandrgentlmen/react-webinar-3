
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '../hoc/require-auth';

import useSelector from "../hooks/use-selector";

import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Registration from "./registration";
import Profile from './profile';


/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

	const activeModal = useSelector(state => state.modals.name);


	return (
		<>
			<Routes>
				<Route path={''} element={<Main />} />
				<Route path={'/articles/:id'} element={<Article />} />
				<Route path={'/login'} element={<Registration />} />
				<Route path={'/profile'} element={
					<RequireAuth>
						<Profile />
					</RequireAuth>
				} />
			</Routes>

			{activeModal === 'basket' && <Basket />}
		</>
	);
}

export default App;
