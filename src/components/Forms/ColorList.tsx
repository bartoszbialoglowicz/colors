import Color from "../../models/color";

const ColorList: React.FC<{colors: Color[], onRemove: (hexVal: string) => void}> = (props) => {
    
    const colorItems = props.colors
    .sort((a,b) => {
        return (a.redValue < b.redValue ? 1 : a.redValue === b.redValue ? 
            a.greenValue < b.greenValue ? 1 : a.greenValue === b.greenValue ?
            a.blueValue < b.blueValue ? 1 : -1 : -1 : -1)
    })
    .map(color => {
        const text = `${color.hexValue} rgb(${color.redValue},${color.greenValue},${color.blueValue})`
        return <li key={color.hexValue}><div>{text}</div>{!color.baseColor && <div onClick={props.onRemove.bind(null, color.hexValue)}>X</div>}</li>
    });


    return (
        <div>
            <ul>
                {colorItems}
            </ul>
        </div>
    )
};

export default ColorList;