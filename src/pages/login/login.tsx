import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import {
  loginUser,
  selectUserError,
  selectUserIsAuth
} from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userError = useSelector(selectUserError);
  const isUserAuth = useSelector(selectUserIsAuth);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isUserAuth === true) {
      navigate('/');
    }
  }, [isUserAuth]);

  return (
    <LoginUI
      errorText={userError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
