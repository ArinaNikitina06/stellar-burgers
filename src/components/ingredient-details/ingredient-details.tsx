import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredientById } from '../../services/slices/ingredientsSlice';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector((state: RootState) =>
    selectIngredientById(state, id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
