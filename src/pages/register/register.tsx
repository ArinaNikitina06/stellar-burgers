import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import {
  registerUser,
  selectUserError,
  selectUserIsAuth
} from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const errorText = useSelector(selectUserError);
  const isUserAuth = useSelector(selectUserIsAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerUser({ name: userName, email, password })
      ).unwrap();
      navigate('/');
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
    <RegisterUI
      errorText={errorText || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
