import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchIngredients,
  selectIngredientsStatus
} from '../../services/slices/ingredientsSlice';
import ProtectedRoute from '../../components/protected-route/protected-route';
import { useDispatch } from '../../services/store';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredientsLoading = useSelector(selectIngredientsStatus);
  const isIngredientsLoading = ingredientsLoading === 'load' ? true : false;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            {/* <ProtectedRoute>
              <BurgerConstructor />
            </ProtectedRoute> */}
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
