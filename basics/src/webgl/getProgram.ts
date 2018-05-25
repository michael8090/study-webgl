function getShader(gl: WebGLRenderingContext, source: string, type: number) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw gl.getShaderInfoLog(shader);
    }
    return shader;
}

export default function getProgram(gl: WebGLRenderingContext,vertString: string, fragString: string) {
    const program = gl.createProgram();
    gl.attachShader(program, getShader(gl, vertString, gl.VERTEX_SHADER));
    gl.attachShader(program, getShader(gl, fragString, gl.FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program,  gl.LINK_STATUS)) {
        throw gl.getProgramInfoLog(program);
    }
    return program;
}