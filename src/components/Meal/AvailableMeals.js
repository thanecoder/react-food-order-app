import { useEffect, useState } from "react";
import classes from "../Meal/AvailableMeals.module.css";
import Card from "../UI/Card";
import DUMMY_MEALS from "./dummy-meals";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      let response = await fetch(
        "https://angular-recipe-shop-list-app.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: responseData[key].id,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setHasError(error.message);
      });
  }, []);

  const mealsList = meals.map((meal) => {
    return <MealItem key={meal.id} meal={meal} />;
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {hasError && <p className={classes.MealsError}>{hasError}</p>}
          {!hasError && isLoading && (
            <p className={classes.MealsLoading}>Loading Data...</p>
          )}
          {!hasError && !isLoading && mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;