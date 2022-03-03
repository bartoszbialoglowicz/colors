class Color {
    hexValue: string;
    redValue: number;
    greenValue: number;
    blueValue: number;
    baseColor: boolean;

    constructor(hexValueI: string, redValueI: number, greenValueI: number, blueValueI: number, baseColorI: boolean) {
        this.hexValue = hexValueI.toUpperCase();
        this.redValue = redValueI;
        this.greenValue = greenValueI;
        this.blueValue = blueValueI;
        this.baseColor = baseColorI;
    };
};

export default Color;