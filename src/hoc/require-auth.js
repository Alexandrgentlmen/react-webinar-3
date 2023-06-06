import { useLocation, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const select = useSelector(state => ({
		token: state.profile.userToken,
	}));
	if (!select.token) {
		return <Navigate to={'/login'} state={{ from: location }} />
	}

	return children
}

export { RequireAuth };