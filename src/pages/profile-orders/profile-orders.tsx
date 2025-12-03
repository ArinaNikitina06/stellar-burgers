import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import {
  fetchUserOrders,
  selectOrdersList,
  selectOrderStatus
} from '../../services/slices/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectOrdersList);
  const isOrdersStatus = useSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  {
    if (isOrdersStatus === 'load') {
      return <Preloader />;
    }
  }
  return <ProfileOrdersUI orders={orders} />;
};
