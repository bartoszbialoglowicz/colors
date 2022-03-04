import { useEffect, useState } from 'react';
import './App.css';
import AddColorForm from './components/Forms/AddColorForm';
import ColorFilterForm from './components/Forms/ColorFilterForm';
import ColorList from './components/Forms/ColorList';
import Color from './models/color';

const App: React.FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [filteredColors, setFilteredColors] = useState<Color[]>([]);
  const [filters, setFilters] = useState<boolean[]>([false, false, false]);
  const basicColors = [new Color('#FF0000', 255, 0, 0, true), new Color('#00FF00', 0, 255, 0, true), new Color('#0000FF', 0, 0, 255, true)];

  useEffect(() => {
    const colorsToSet: Color[] = localStorage.getItem('colors') === null ? basicColors : (JSON.parse(localStorage.getItem('colors') || ''));
    setColors(colorsToSet);
  }, []);

  const isInArr = (color: Color) => {
    let assigned = false;
    colors.forEach((item) => {
      if (item.hexValue === color.hexValue) {
        assigned = true;
      }
    });
    return assigned;
  }

  const addHexColorHandler = (hexValue: string): void => {
    let newColor = new Color('#FF0000', 255, 0, 0, false);
    if (hexValue.length === 4) {
      const red = parseInt((hexValue[1]+hexValue[1]), 16)
      const green = parseInt((hexValue[2]+hexValue[2]), 16)
      const blue = parseInt((hexValue[3]+hexValue[3]), 16)
      const hex = `#${hexValue[1]}${hexValue[1]}${hexValue[2]}${hexValue[2]}${hexValue[3]}${hexValue[3]}`
      newColor = new Color(hex, red, green, blue, false);
    } else if (hexValue.length === 7) {
      const red = parseInt((hexValue[1]+hexValue[2]), 16)
      const green = parseInt((hexValue[3]+hexValue[4]), 16)
      const blue = parseInt((hexValue[5]+hexValue[6]), 16)
      newColor = new Color(hexValue, red, green, blue, false);
    }
    if (!isInArr(newColor)) {
      localStorage.setItem('colors', JSON.stringify(colors.concat(newColor)));
      setColors((prevState) => {
        return [...prevState, newColor];
      });
    }
  };

  const addRgbColorHandler = (red: number, green: number, blue: number) => {
    const redV = red.toString(16).length < 2 ? '0'+red.toString(16) : red.toString(16);
    const greenV = green.toString(16).length < 2 ? '0'+green.toString(16) : green.toString(16);;
    const blueV = blue.toString(16).length < 2 ? '0'+blue.toString(16) : blue.toString(16);;
    const hexVal = `#${redV}${greenV}${blueV}`;
    const newColor = new Color(hexVal, red, green, blue, false);
    if (!isInArr(newColor)) {
      localStorage.setItem('colors', JSON.stringify(colors.concat(newColor)));
      setColors((prevState) => {
        return [...prevState, newColor];
      })
    }
  };

  const removeColorHandler = (hexVal: string) => {
    localStorage.setItem('colors', JSON.stringify(colors.filter(item => item.hexValue !== hexVal)));
    setColors(prevState => {
      return prevState.filter(item => item.hexValue !== hexVal)
    })
  }

  useEffect(() => {
    let tmpColors = [...colors];
    let colorsToSet: Color[] = [];
    if (filters[0]) {
      colorsToSet = colorsToSet.concat(tmpColors.filter(item => item.redValue > 127));
      console.log(colorsToSet);
      tmpColors = tmpColors.filter(item => item.redValue < 128);
    }
    if (filters[1]) {
      colorsToSet = colorsToSet.concat(tmpColors.filter(item => item.greenValue > 127));
      tmpColors = tmpColors.filter(item => item.greenValue < 128);
    }
    if (filters[2]) {
      colorsToSet = colorsToSet.concat(tmpColors.filter(item => item.blueValue > 127));
      tmpColors = tmpColors.filter(item => item.blueValue < 128);
    };

    if (!filters[0] && !filters[1] && !filters[2]) {
      colorsToSet = [...colors];
    }

    setFilteredColors(colorsToSet);
  }, [filters, colors]);

  const redFilterHandler = () => {
    let prevState = [...filters];
    prevState[0] = !prevState[0];
    setFilters([...prevState]);
  };

  const greenFilterHandler = () => {
    let prevState = [...filters];
    prevState[1] = !prevState[1];
    setFilters([...prevState]);
  };

  const blueFilterHandler = () => {
    let prevState = [...filters];
    prevState[2] = !prevState[2];
    setFilters([...prevState]);
  };

  return (
    <div className="App">
      <AddColorForm onAddHex={addHexColorHandler} onAddRgb={addRgbColorHandler}/>
      <ColorFilterForm rFilter={redFilterHandler} gFilter={greenFilterHandler} bFilter={blueFilterHandler} filterState={filters}/>
      <ColorList colors={filteredColors} onRemove={removeColorHandler}/>
    </div>
  );
}

export default App;
