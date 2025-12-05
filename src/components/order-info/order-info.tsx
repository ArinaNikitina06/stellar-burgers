import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, selectFeeds } from '../../services/slices/feedSlice';
import { RootState } from '../../services/store';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import {
  fetchOrderByNumber,
  selectCurrentOrderByNumber,
  selectOrdersList
} from '../../services/slices/orderSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { number } = useParams();
  const orderData = useSelector(selectCurrentOrderByNumber);
  // const orders = useSelector(selectOrdersList);

  // const orders = useSelector(selectFeeds);

  // const orderData = useSelector((state: RootState) =>
  //   selectFeedById(state, number)
  // );
  const ingredients: TIngredient[] = useSelector(selectIngredients);

  // const orderData = orders.find((order) => order.number.toString() === number);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchFeeds());
    // console.log('OrderInfo useEffect');
  }, []);

  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(number)));
  }, []);

  // console.log('number', number);
  // console.log('orders(feeds!!!)', orders);
  // console.log('orderData', orderData);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    {
      console.log('pre...');
    }
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
