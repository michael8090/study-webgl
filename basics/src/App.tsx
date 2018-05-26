import * as React from 'react';
import './App.css';
import Demo from './Demo';
import * as basic from './webgl/basic';
import * as waves from './webgl/waves';

const demos = ['basic', 'waves'];

interface State {
    demoName: string;
}

class App extends React.Component<{}, State> {
    private startBasic(canvas: HTMLCanvasElement) {
        basic.init(canvas);
        document.onkeyup = e => {
            if (e.key === ' ') {
                basic.clear();
            }
        };
        canvas.onmousedown = (e) => {
            basic.begin();
            basic.draw(e.layerX, e.layerY);
        }
        canvas.onmousemove = e => {
            basic.draw(e.layerX, e.layerY);
        };
        canvas.onmouseup = () => {
            basic.end();
        }
    }
    private startWaves(canvas: HTMLCanvasElement) {
        waves.init(canvas);
        const t0 = Date.now();
        function draw() {
            waves.draw(Date.now() - t0);
            requestAnimationFrame(draw);
        }
        draw();
    }

    public state = {
        demoName: 'basic'
    };

    private demos = {
        basic: (
            <Demo
                didMount={this.startBasic}
                willUnmount={() => {
                    document.onkeyup = null;
                    basic.clear();
                }}
            >
                <h4>press blankspace to clear the canvas</h4>
            </Demo>
        ),
        waves: <Demo didMount={this.startWaves} />
    };

    public render() {
        const { state } = this;
        return (
            <div className="App">
                <label className="demo-selector">
                    select demo
                    <select value={state.demoName} onChange={e => {this.setState({demoName: e.target.value}); e.target.blur();}}>
                        {demos.map(name => (
                            <option value={name} key={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <div key={state.demoName}>{this.demos[state.demoName]}</div>
            </div>
        );
    }
}

export default App;
