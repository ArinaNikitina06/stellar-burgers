import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from '../../services/store';
import {
  selectUser,
  selectUserIsAuth,
  selectUserStatus
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

type TProtectedRoute = {
  children: ReactNode;
};

const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectUserIsAuth);
  const status = useSelector(selectUserStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'load') {
      return; // Если состояние загрузки, ничего не делаем
    }

    if (isAuth !== true) {
      navigate('/login');
    }
  }, [isAuth, user, status, navigate]);

  if (status === 'load') {
    return <Preloader />;
  }

  return children;
};

export default ProtectedRoute;
