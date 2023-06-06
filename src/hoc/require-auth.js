import { useLocation, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const select = useSelector(state => ({
		isAuth: state.profile.isAuth,
	}));
	if (!select.isAuth) {
		return <Navigate to={'/login'} state={{ from: location }} />
	}

	return children
}

export { RequireAuth };