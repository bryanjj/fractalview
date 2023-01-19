import "./styles.css";

import * as React from "react";

import Complex from "./complex";
import CoordMapper from "./coordMapper";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// main app
export default function App(): JSX.Element {
  // current view is set with 2 params:
  // fractalTopLeft (Complex) and fractalWidth (int)

  // state of the current view location
  // left corner starts at point z=-2+2i
  const [fractalTopLeft, setFractalTopLeft] = React.useState<Complex>(
    new Complex(-2, 2)
  );

  // window width starts at 4
  const [fractalWidth, setFractalWidth] = React.useState<number>(4);

  // how many X we zoom in a click
  // (width will be divided by this factor on each click)
  const zoomFactor = 2.0;

  // this is the raw number of pixels wide for the canvas
  const canvasWidth: number = 250;

  // React element for drawing our fractal
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  /**
   * main fractal iteration loop which computes:
   * Zn+1 = Zn^2 + c recursively until it converges or diverges
   * @param zn {Complex} Zn in Zn+1=Zn+c
   * @param c {Complex} c in Zn+1=Zn+c
   * @returns {int} the number of steps it takes to diverge,
   * or 0 if it has not diverged after MAX_STEPS
   */
  const iterFractal = (zn: Complex, c: Complex): number => {
    const MAX_STEPS = 512;
    for (let i = 0; i < MAX_STEPS; i++) {
      if (zn.norm() > 4) {
        // diverged in i steps
        return i;
      }
      zn = zn.mult(zn).add(c);
    }
    // did not diverge after MAX_STEPS
    return MAX_STEPS / 8;
  };

  /**
   * converts from (x,y) coords of the view, to a complex number which represents that pixel
   * @param x x-coord of the window
   * @param y y-coord of the window
   * @returns {Complex} complex number which represents the x,y coord
   */
  const xyToComplex = (x: number, y: number): Complex => {
    const re = fractalTopLeft.re + (x / canvasWidth) * fractalWidth;
    const im = fractalTopLeft.im - (y / canvasWidth) * fractalWidth;
    return new Complex(re, im);
  };

  // Maps the real Z0 part to a dimension
  const [reZ0Dim, setReZ0Dim] = React.useState<string>();

  // Maps the imag Z0 part to a dimension
  const [imZ0Dim, setImZ0Dim] = React.useState<string>();

  // Maps the real c part to a dimension, init to x for mandelbrot
  const [reCDim, setReCDim] = React.useState<string>("x");

  // Maps the imag c part to a dimension, init to y for mandelbrot
  const [imCDim, setImCDim] = React.useState<string>("y");

  /**
   * given a 3-dimensional coord (x window, y window, and t time)
   * get the complex number c which represents that point
   * @param x {number} x-coord
   * @param y {number} y-coord
   * @param t {number} time t-coord
   * @returns {Complex} complex number c which represents that point
   */
  const getC = (x: number, y: number, t: number): Complex => {
    const complexPoint: Complex = xyToComplex(x, y);

    let re: number = Number.parseFloat(reCDim ?? NaN);
    if (isNaN(re)) {
      switch (reCDim) {
        case "x":
          re = complexPoint.re;
          break;
        case "y":
          re = complexPoint.im;
          break;
        case "time":
          re = t;
          break;
        default:
          re = 0;
      }
    }

    let im: number = Number.parseFloat(imCDim ?? NaN);
    if (isNaN(im)) {
      switch (imCDim) {
        case "x":
          im = complexPoint.re;
          break;
        case "y":
          im = complexPoint.im;
          break;
        case "time":
          im = t;
          break;
        default:
          im = 0;
      }
    }

    return new Complex(re, im);
  };

  /**
   * given a 3-dimensional coord (x window, y window, and t time)
   * get the complex number Z0 which represents that point
   * @param x {number} x-coord
   * @param y {number} y-coord
   * @param t {number} time t-coord
   * @returns {Complex} complex number Z0 which represents that point
   */
  const getZ = (x: number, y: number, t: number): Complex => {
    const complexPoint: Complex = xyToComplex(x, y);

    let re: number = Number.parseFloat(reZ0Dim ?? "");
    if (isNaN(re)) {
      switch (reZ0Dim) {
        case "x":
          re = complexPoint.re;
          break;
        case "y":
          re = complexPoint.im;
          break;
        case "time":
          re = t;
          break;
        default:
          re = 0;
      }
    }

    let im: number = Number.parseFloat(imZ0Dim ?? "");
    if (isNaN(im)) {
      switch (imZ0Dim) {
        case "x":
          im = complexPoint.re;
          break;
        case "y":
          im = complexPoint.im;
          break;
        case "time":
          im = t;
          break;
        default:
          im = 0;
      }
    }

    return new Complex(re, im);
  };

  /**
   * Draw the canvas
   */
  React.useEffect(() => {
    const context:
      | CanvasRenderingContext2D
      | null
      | undefined = canvasRef.current?.getContext("2d");
    if (context != null) {
      const t = 0;

      context.clearRect(0, 0, canvasWidth, canvasWidth);

      // for each point in the canvas, calc the fractal
      for (let x = 0; x < canvasWidth; x++) {
        for (let y = 0; y < canvasWidth; y++) {
          const z = getZ(x, y, t);
          const c = getC(x, y, t);
          const steps = iterFractal(z, c);
          context.fillStyle = `rgb(0, ${steps / 2}, ${steps / 2})`;

          context.fillRect(x, y, 1, 1);
        }
      }
    }
  }, [fractalTopLeft, reCDim, imCDim, reZ0Dim, imZ0Dim]);

  /**
   * zoom on click.
   * point clicked becomes new center of the fractal and zoomed by the zoomFactor
   */
  const onClickHandler = (event: React.MouseEvent): void => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (canvasRect != null) {
      const clickPoint: Complex = xyToComplex(
        event.clientX - canvasRect.left,
        event.clientY - canvasRect.top
      );
      const newWidth: number = (1 / zoomFactor) * fractalWidth;

      setFractalWidth(newWidth);
      setFractalTopLeft(
        new Complex(clickPoint.re - newWidth / 2, clickPoint.im + newWidth / 2)
      );
    }
  };

  const onResetViewHandler = (event: React.MouseEvent): void => {
    setFractalWidth(4);
    setFractalTopLeft(new Complex(-2, 2));
  };

  // render the app
  return (
    <div className="App">
      <h2>Zn+1 = Zn^2 + c</h2>
      <Button onClick={onResetViewHandler}>Reset view</Button>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <CoordMapper
            coordRealZ0={reZ0Dim}
            setCoordRealZ0={setReZ0Dim}
            coordImagZ0={imZ0Dim}
            setCoordImagZ0={setImZ0Dim}
            coordRealC={reCDim}
            setCoordRealC={setReCDim}
            coordImagC={imCDim}
            setCoordImagC={setImCDim}
          />
        </Grid>

        <Grid item xs={0}>
          <canvas
            id="canvas"
            ref={canvasRef}
            width={canvasWidth}
            height={canvasWidth}
            onClick={onClickHandler}
          ></canvas>
        </Grid>
      </Grid>
    </div>
  );
}
