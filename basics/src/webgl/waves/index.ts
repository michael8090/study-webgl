import basicFrag from '!raw-loader!./shader.frag';
import basicVert from '!raw-loader!./shader.vert';
import getProgram from '../getProgram';
import setRectBuffer from '../setRectBuffer';

let program: WebGLProgram;
let gl: WebGLRenderingContext;
let timeUniformLocation: WebGLUniformLocation ;
let sizeUniformLocation: WebGLUniformLocation ;
let positionAttributeLocation: number;
let verticesBuffer: WebGLBuffer;
let width: number;
let height: number;

export function init(canvas: HTMLCanvasElement) {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    gl = canvas.getContext('webgl')!;
    gl.viewport(0, 0, width, height);    
    program = getProgram(gl, basicVert, basicFrag)!;
    timeUniformLocation = gl.getUniformLocation(program, 'u_time')!;
    sizeUniformLocation = gl.getUniformLocation(program, 'u_size')!;
    positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    verticesBuffer = gl.createBuffer()!;
}

export function clear() {
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

export function draw(time: number) {
    // as preserveDrawingBuffer defaults to false, the canvas is already cleared after draw, we don't need to clear it mannually
    setRectBuffer(gl, verticesBuffer, -0.5 * width, -0.5 * height, width, height);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(timeUniformLocation, time);
    gl.uniform2fv(sizeUniformLocation, [width, height]);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
}
