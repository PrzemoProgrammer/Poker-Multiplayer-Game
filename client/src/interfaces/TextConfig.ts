export default interface TextConfig {
    message: string | number;
    x: number;
    y: number;
    anchorX: number;
    anchorY: number;
    visible: boolean;
    textConfig: {
        fontFamily: string,
        fontSize: number,
        fill: number, 
    }
  }