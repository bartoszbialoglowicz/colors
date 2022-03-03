const ColorFilterForm: React.FC<{rFilter: () => void, gFilter: () => void, bFilter: () => void}> = (props) => {
    return (
        <form>
            <div><input type="button" value="RED" onClick={props.rFilter}/></div>
            <div><input type="button" value="GREEN" onClick={props.gFilter}/></div>
            <div><input type="button" value="BLUE" onClick={props.bFilter}/></div>
        </form>
    )
};

export default ColorFilterForm;