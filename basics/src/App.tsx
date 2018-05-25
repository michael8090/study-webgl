import * as React from 'react';
import './App.css';
import * as basic from './webgl/basic'

class App extends React.Component {
  private canvas: HTMLCanvasElement;
  public componentDidMount() {
    const {canvas} = this;
    basic.init(canvas);
    document.onkeyup = e => {
      if (e.key === ' ') {
        basic.clear();
      }
    }
    canvas.onmousemove = e => {
      basic.draw(e.layerX, e.layerY);
    }
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
