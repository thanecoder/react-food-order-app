// Core 
import { Fragment } from 'react';

// CSS
import classes from '../Layout/Header.module.css';

import HeaderCartButton from '../Layout/HeaderCartButton';

// Assets
import mealsImage from '../../assets/imgs/meals.jpg';

const Header = (props) => {



    return (
        <Fragment>
        <header className={classes.header}>
            <h1>
                ReactMeals
            </h1>
            <HeaderCartButton onClick={props.onCartClicked}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="Order Delicious Food"/>
        </div>
    </Fragment>
    );
};

export default Header;