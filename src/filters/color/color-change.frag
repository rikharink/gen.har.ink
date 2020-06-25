#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float iTime;
uniform float time;

void main(void){
  // Time varying pixel color
  vec3 c=.5+.5*cos(iTime+vTextureCoord.xyx+vec3(0,2,4));
  vec4 col=vec4(c,1.);
  vec4 txtC=texture2D(uSampler,vTextureCoord);
  gl_FragColor=col * txtC;
}