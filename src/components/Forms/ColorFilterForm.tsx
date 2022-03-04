import Card from "../UI/Card";
import classes from './ColorFilterForm.module.css';

const ColorFilterForm: React.FC<{rFilter: () => void, gFilter: () => void, bFilter: () => void}> = (props) => {
    return (
        <Card>  
            <form className={classes.filterForm}>
            <h3>Filter by color:</h3>
                <div><input type="button" value="RED" onClick={props.rFilter} className={classes.filterButtonRed}/></div>
                <div><input type="button" value="GREEN" onClick={props.gFilter} className={classes.filterButtonGreen}/></div>
                <div><input type="button" value="BLUE" onClick={props.bFilter} className={classes.filterButtonBlue}/></div>
            </form>
        </Card>
        
    )
};

export default ColorFilterForm;