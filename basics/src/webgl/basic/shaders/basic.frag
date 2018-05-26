precision mediump float;

uniform float time;

void main() {
    vec2 color = vec(sin(gl_FragCoord.x + time * 0.001), cos(gl_FragCoord.y + time*0.001)) * 0.5 + 0.5;
    gl_FragColor = vec4(color, 0, 1);
}