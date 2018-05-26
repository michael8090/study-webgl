precision mediump float;

uniform float u_time;
uniform vec2 u_size;

void main() {
    float fraq = 0.1;
    vec2 xy = gl_FragCoord.xy - (u_size * 0.5); // -0.5 size ~ 0.5 size
    float xyLength = length(xy);
    float r = xyLength * fraq - u_time * 0.001;
    vec2 color = vec2(sin(r), cos(r)) * 0.5 + 0.5;
    vec2 ratio = xy / u_size * 2.0; // -1 ~ 1
    gl_FragColor = vec4(color, 1, 1.0 - abs(length(ratio)));
}