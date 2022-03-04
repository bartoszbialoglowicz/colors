import Card from "../UI/Card";
import classes from './ColorFilterForm.module.css';

const ColorFilterForm: React.FC<{rFilter: () => void, gFilter: () => void, bFilter: () => void, filterState: boolean[]}> = (props) => {
    const rInputClasses = props.filterState[0] ? `${classes.filterButtonRed} ${classes.filterActive}` : classes.filterButtonRed;
    const gInputClasses = props.filterState[1] ? `${classes.filterButtonGreen} ${classes.filterActive}` : classes.filterButtonGreen;
    const bInputClasses = props.filterState[2] ? `${classes.filterButtonBlue} ${classes.filterActive}` : classes.filterButtonBlue;

    return (
        <Card>  
            <form className={classes.filterForm}>
            <h3>Filter by color:</h3>
                <div><input type="button" value="RED" onClick={props.rFilter} className={rInputClasses}/></div>
                <div><input type="button" value="GREEN" onClick={props.gFilter} className={gInputClasses}/></div>
                <div><input type="button" value="BLUE" onClick={props.bFilter} className={bInputClasses}/></div>
            </form>
        </Card>
        
    )
};

export default ColorFilterForm;