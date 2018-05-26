import basicFrag from '!raw-loader!./shaders/basic.frag';
import basicVert from '!raw-loader!./shaders/basic.vert';
import getProgram from '../getProgram';

let program: WebGLProgram;
let gl: WebGLRenderingContext;
let positionAttributeLocation: number;
let verticesBuffer: WebGLBuffer;
let width: number;
let height: number;
let clientWidth: number;
let clientHeight: number;
let data: number[] = [];

export function init(canvas: HTMLCanvasElement) {
    width = canvas.width;
    height = canvas.height; // it has to be from canvas.width and canvs.height, as it's the real pixels
    clientWidth = canvas.clientWidth;
    clientHeight = canvas.clientHeight;
    gl = canvas.getContext('webgl')!;
    gl.viewport(0, 0, width, height); 
    program = getProgram(gl, basicVert, basicFrag)!;
    positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    verticesBuffer = gl.createBuffer()!;
}

export function clear() {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    data = [];
}

export function draw(x: number, y: number) {
    // as preserveDrawingBuffer defaults to false, the canvas is already cleared after draw, we don't need to clear it mannually
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    data.push((x / clientWidth - 0.5) * 2, -(y / clientHeight - 0.5) * 2);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.LINE_STRIP, 0, data.length / 2);
}
