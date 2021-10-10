import classes from '../Meal/AvailableMeals.module.css';
import Card from '../UI/Card';
import DUMMY_MEALS from './dummy-meals';
import MealItem from './MealItem/MealItem';

const AvailableMeals = (props) => {

    const mealsList = DUMMY_MEALS.map(meal=>{return <MealItem key={meal.id} meal={meal} />});


    return (
        <section className={classes.meals}> 
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;