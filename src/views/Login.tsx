import { AUTH_LINK } from '@/api';
import { useAppDispatch, useHashQuery } from '@/hooks';
import { userActions } from '@/store/user';
import { useHistory } from 'react-router-dom';


const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const query = useHashQuery();

  const token = query.get('access_token');
  if (token) {
    dispatch(userActions.authenticate(token));
    history.push('/');
  }

  return (
    <div>
      <a
        href={AUTH_LINK}
        className="bg-green-500 px-3 py-2 text-white rounded-lg font-medium tracking-wide hover:bg-green-600"
      >
        LOGIN
      </a>
    </div>
  );
};

export default Login;
