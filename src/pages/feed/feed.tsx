import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeeds,
  selectFeeds,
  selectFeedsError,
  selectFeedsStatus
} from '../../services/slices/feedSlice';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeeds);
  const feedsOrdersStatus = useSelector(selectFeedsStatus);
  const feedsOrderError = useSelector(selectFeedsError);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  // if (feedsOrderError.length > 0) {
  //   return <Error />
  // }

  if (!orders.length || feedsOrdersStatus === 'load') {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
