import Color from "../../models/color";
import Card from "../UI/Card";

import classes from './ColorList.module.css';

const ColorList: React.FC<{colors: Color[], onRemove: (hexVal: string) => void}> = (props) => {

    const colorItems = props.colors
    .sort((a,b) => {
        return (a.redValue < b.redValue ? 1 : a.redValue === b.redValue ? 
            a.greenValue < b.greenValue ? 1 : a.greenValue === b.greenValue ?
            a.blueValue < b.blueValue ? 1 : -1 : -1 : -1)
    })
    .map(color => {
        const text = `${color.hexValue} rgb(${color.redValue},${color.greenValue},${color.blueValue})`
        return <li key={color.hexValue}>
            <div className={classes.itemListItem}>
                <div className={classes.itemColor}>
                </div>
                <p>{text}</p>
            </div>
            {!color.baseColor && <div onClick={props.onRemove.bind(null, color.hexValue)} className={classes.removeItem}>X</div>}
        </li>
    });


    return (
        <Card>
            <ul className={classes.colorList}>
                {colorItems}
            </ul>
        </Card>
    )
};

export default ColorList;