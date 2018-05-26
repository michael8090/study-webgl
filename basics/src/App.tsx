import * as React from 'react';
import './App.css';
// import * as basic from './webgl/basic'
import * as waves from './webgl/waves';

class App extends React.Component {
  private canvas: HTMLCanvasElement;
  public componentDidMount() {
    const {canvas} = this;
    // basic.init(canvas);
    // document.onkeyup = e => {
    //   if (e.key === ' ') {
    //     basic.clear();
    //   }
    // }
    // canvas.onmousemove = e => {
    //   basic.draw(e.layerX, e.layerY);
    // }
    waves.init(canvas);
    const t0 = Date.now();
    function draw() {
      waves.draw(Date.now() - t0);
      requestAnimationFrame(draw);
    }
    draw();
  }
  public render() {
    return (
      <div className="App">
        <h4>press blankspace to clear the canvas</h4>
        <canvas ref={c => this.canvas = c!} width="800" height="800" />
      </div>
    );
  }
}

export default App;
