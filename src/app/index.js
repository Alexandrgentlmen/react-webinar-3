
import { Routes, Route } from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";

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
			</Routes>

			{activeModal === 'basket' && <Basket />}
		</>
	);
}

export default App;
