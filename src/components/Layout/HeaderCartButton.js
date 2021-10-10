import {useState, useContext, useEffect} from 'react';

import classes from '../Layout/HeaderCartButton.module.css';

import CartIcon from './CartIcon';

import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

    const [btnHighlighted,setBtnHighlighted] = useState(false);
    const ctx = useContext(CartContext);
    const numberOfCartItems = ctx.items.reduce((curNumber,item)=>{
        return curNumber+item.amount
    },0)

    const { items } = ctx;
    const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump: ''}`;

    useEffect(() => {
        if(items.length === 0){
            return;
        }
        setBtnHighlighted(true)
        const timer = setTimeout(()=>{
            setBtnHighlighted(false);
        },300)
        return ()=>{
            clearTimeout(timer);
        };
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;