import React, { useState, useRef } from "react"
import Card from "../UI/Card";

import classes from './AddColorForm.module.scss';

const AddColorForm: React.FC<{onAddHex: (hex: string) => void, onAddRgb: (r: number, g: number, b: number) => void}> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const inputRedColorRef = useRef<HTMLInputElement>(null);
    const inputGreenColorRef = useRef<HTMLInputElement>(null);
    const inputBlueColorRef = useRef<HTMLInputElement>(null);

    const [hexForm, setHexForm] = useState(true);
    const [inputValue, setInputValue] = useState('#');
    const [inputRedColorValue, setInputRedColorValue] = useState(0);
    const [inputGreenColorValue, setInputGreenColorValue] = useState(0);
    const [inputBlueColorValue, setInputBlueColorValue] = useState(0);

    const changeColorFormHandler = () => {
        setHexForm((prevState) => {
            return !prevState;
        });
        setInputValue('#');
        setInputRedColorValue(0);
        setInputGreenColorValue(0);
        setInputBlueColorValue(0);
    };

    const hexValidatorHandler = () => {
        const refValue = inputRef.current!.value;
        const validSymbols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'A','B','C','D','E','F'];
        let strToSet: string = inputValue;
        let canAdd = true;
        for (let i = inputValue.length; i < refValue.length; i++) {
            if (!validSymbols.includes(refValue[i])) {
                canAdd = false;
            }
        }
        if (canAdd || (inputValue.length === 2 && inputValue.length > refValue.length)) {
            strToSet = refValue;
        }
        if (refValue[0] !== '#') {
            setInputValue('#');
        } else if (strToSet.length < 8){
            setInputValue(strToSet);
        }
    };

    const redValidatorHandler = () => {
        const ref = parseInt(inputRedColorRef.current!.value);
        rgbValidatorHandler(ref , inputRedColorValue, setInputRedColorValue);
    };

    const greenValidatorHandler = () => {
        const ref = parseInt(inputGreenColorRef.current!.value);
        rgbValidatorHandler(ref , inputGreenColorValue, setInputGreenColorValue);
    };

    const blueValidatorHandler = () => {
        const ref = parseInt(inputBlueColorRef.current!.value);
        rgbValidatorHandler(ref , inputBlueColorValue, setInputBlueColorValue);
    };

    const rgbValidatorHandler = (value: number, prevValue: number, fn: (val: number) => void) => {
        if (value > 255 || value < 0) {
            fn(prevValue);
        } else if (isNaN(value)) {
            fn(0);
        } else {
            fn(value);
        }
    };

    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (hexForm) {
            props.onAddHex(inputValue);
        } else {
            props.onAddRgb(inputRedColorValue, inputGreenColorValue, inputBlueColorValue);
        }
        
    }

    const colorFormText = hexForm ? 'RGB' : 'HEX';
    const isButtonDisabled = !hexForm ? false : (inputValue.length === 4 || inputValue.length === 7) ? false : true;

    return (
        <Card>
            <div className={classes.addFormContainer}>
                <form onSubmit={onSubmitHandler}>
                { hexForm &&
                <div className={classes.inputContainer}>
                    <label htmlFor='color'>HEX</label>
                    <input type='text' id='color' ref={inputRef} value={inputValue} onChange={hexValidatorHandler}/>
                    <input type="button" onClick={changeColorFormHandler} className={classes.colorFormButton} value={colorFormText} />
                </div> }
                { !hexForm &&
                <div className={`${classes.inputContainer} ${classes.inputRgbContainer}`}>
                    <label htmlFor='colorRed'>R</label>
                    <input type='tel' id='colorRed' ref={inputRedColorRef} value={inputRedColorValue} onChange={redValidatorHandler}/>
                    <label htmlFor='colorGreen'>G</label>
                    <input type='tel' id='colorGreen' ref={inputGreenColorRef} value={inputGreenColorValue} onChange={greenValidatorHandler} />
                    <label htmlFor='color'>B</label>
                    <input type='tel' id='colorGreen' ref={inputBlueColorRef} value={inputBlueColorValue} onChange={blueValidatorHandler} />
                    <input type="button" onClick={changeColorFormHandler} className={classes.colorFormButton} value={colorFormText} />
                </div>
                }
                <div className={classes.submitInputContainer}>
                    <input type='submit' value='ADD COLOR' disabled={isButtonDisabled} className={classes.submitInput}/>
                </div>
            </form>
        </div>
        </Card> 
    )
};

export default AddColorForm;