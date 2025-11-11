import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  selectOrdersList
} from '../../services/slices/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrdersList);
  console.log('orders', orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
