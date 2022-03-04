import Color from "../../models/color";
import Card from "../UI/Card";

import classes from './ColorList.module.scss';
import ColorListItem from "./ColorListItem";

const ColorList: React.FC<{colors: Color[], onRemove: (hexVal: string) => void}> = (props) => {

    const colorItems = props.colors
    .sort((a,b) => {
        return (a.redValue < b.redValue ? 1 : a.redValue === b.redValue ? 
            a.greenValue < b.greenValue ? 1 : a.greenValue === b.greenValue ?
            a.blueValue < b.blueValue ? 1 : -1 : -1 : -1)
    })
    .map(color => {
        const text = `${color.hexValue} rgb(${color.redValue},${color.greenValue},${color.blueValue})`
        return <ColorListItem key={color.hexValue} hexValue={color.hexValue} text={text} baseColor={color.baseColor} onRemove={props.onRemove}/>
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