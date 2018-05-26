import * as React from 'react';

interface Props {
    didMount?(canvas: HTMLCanvasElement): void;
    willUnmount?(canvas: HTMLCanvasElement): void;
}

export default class Demo extends React.Component<Props> {
    private canvas: HTMLCanvasElement;
    public componentDidMount() {
        if (this.props.didMount) {
            this.props.didMount(this.canvas);
        }
    }
    public componentWillUnmount() {
        if (this.props.willUnmount) {
            this.props.willUnmount(this.canvas);
        }
    }
    public render() {
        const width = 800;
        const height = 800;
        const {devicePixelRatio} = window;
        return (
            <div>
                <canvas style={{border: 'solid 1px gray', width: width + 'px', height: height + 'px'}} 
                    ref={c => this.canvas = c!} width={width * devicePixelRatio} height={height * devicePixelRatio} />
                {this.props.children}
            </div>
        );
    }
}