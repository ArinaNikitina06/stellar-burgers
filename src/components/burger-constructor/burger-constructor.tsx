import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructorBun,
  selectConstructorList
} from '../../services/slices/constructorSlice';
import {
  clearOrder,
  createOrder,
  selectCreatedOrder,
  selectOrderStatus
} from '../../services/slices/orderSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser, selectUserIsAuth } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorList);
  const constructorItems = {
    bun,
    ingredients
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderRequest = useSelector(selectOrderStatus) === 'load' ? true : false;
  const orderModalData = useSelector(selectCreatedOrder);

  const user = useSelector(selectUser);
  const isAuth = useSelector(selectUserIsAuth);

  const onOrderClick = () => {
    if (isAuth !== true || user === null) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then(() => dispatch(clearConstructor()))
      .catch((error) => console.error(error));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
