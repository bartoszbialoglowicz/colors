import React from "react"

import classes from './ColorListItem.module.scss';

class ColorListItem extends React.Component<{hexValue: string, text: string , baseColor: boolean ,onRemove: (a: string) => void}> {
    render() {
        return (
            <li key={this.props.hexValue}>
                <div className={classes.itemListItem}>
                    <div className={classes.itemColor} style={{backgroundColor: this.props.hexValue}}>
                    </div>
                    <p>{this.props.text}</p>
                </div>
                {!this.props.baseColor && <div onClick={this.props.onRemove.bind(null, this.props.hexValue)} className={classes.removeItem}>X</div>}
            </li>
        )
    }
};

export default ColorListItem