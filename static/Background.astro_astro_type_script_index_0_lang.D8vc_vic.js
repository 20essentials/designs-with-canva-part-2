const t=document.getElementById("shaderCanvas"),e=t.getContext("webgl");if(!e)throw alert("WebGL not supported"),new Error("WebGL not supported");function f(o,i,g){const l=o.createShader(i);return l?(o.shaderSource(l,g),o.compileShader(l),o.getShaderParameter(l,o.COMPILE_STATUS)?l:(console.error("Shader compile error:",o.getShaderInfoLog(l)),o.deleteShader(l),null)):null}const v=`
    attribute vec2 position;
    void main() {
        gl_Position = vec4(position, 0.0, 1.0);
    }
`,y=`
    precision highp float;
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 rippleCenter;
    uniform float rippleTime;
    
    vec2 fluidFlow(vec2 p, vec2 mousePos, float strength) {
        vec2 diff = mousePos - p;
        float dist = length(diff);
        float factor = exp(-dist * 1.5) * strength;
        return diff * factor;
    }
    
    void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.5;
        vec2 m = (mouse * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        uv *= 1.5;
        
        vec3 finalColor = vec3(0.0);
        float totalIntensity = 0.0;
        
        float attractStrength = 0.6;
        vec2 flow = fluidFlow(uv, m, attractStrength);
        
        for(float i = 0.0; i < 4.0; i++) {
            vec2 p = uv;
            float id = i + 1.0;
            p += flow / (id * 0.25);
            p.x += sin(t * id * 0.4) * 0.8;
            p.y += cos(t * id * 0.3) * 0.8;
            
            float angle = atan(p.y, p.x) * 2.0;
            float dist = length(p) * 1.5;
            
            float pattern = sin(dist * 5.0 - t * 3.0 + angle * 2.0) +
                           cos(dist * 6.0 - t * 2.0 + angle * 3.0) +
                           sin(dist * 7.0 - t * 4.0 + angle);
            
            pattern = abs(pattern) / 3.0;
            pattern = pow(0.1 / (pattern + 0.1), 1.5);
            
            vec3 baseColor = vec3(1.0, 0.2, 0.3);
            if(i == 1.0) baseColor = vec3(0.2, 0.8, 1.0);
            if(i == 2.0) baseColor = vec3(1.0, 0.8, 0.2);
            if(i == 3.0) baseColor = vec3(0.8, 0.2, 1.0);
            
            vec3 color = baseColor * (0.6 + 0.4 * cos(vec3(0.0, 0.3, 0.6) * 6.28 + t + id));
            float highlight = exp(-dist * 2.0) * 1.8;
            
            finalColor += color * (pattern + highlight) * (1.2 / id);
            totalIntensity += pattern;
        }
        
        vec2 rc = (rippleCenter * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float d = length(uv - rc);
        float normalizedTime = clamp(rippleTime / 1.5, 0.0, 1.0);
        
        float rippleWave = sin(15.0 * (d - rippleTime * 2.2)) *
                          cos(10.0 * (d - rippleTime * 1.8)) *
                          exp(-d * 1.2) *
                          (1.0 - pow(normalizedTime, 1.5));
        
        vec3 rippleColor = vec3(0.8, 0.3, 1.0) + 
                          vec3(0.2, 0.5, 0.4) * cos(rippleTime * 4.0);
        finalColor += rippleColor * rippleWave * 0.7;
        
        finalColor /= (totalIntensity * 0.3 + 1.0);
        finalColor = pow(finalColor, vec3(0.7));
        finalColor *= 1.3;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
`,d=f(e,e.VERTEX_SHADER,v),p=f(e,e.FRAGMENT_SHADER,y);if(!d||!p)throw new Error("Shader creation failed");const r=e.createProgram();e.attachShader(r,d);e.attachShader(r,p);e.linkProgram(r);if(!e.getProgramParameter(r,e.LINK_STATUS))throw console.error("Program link error:",e.getProgramInfoLog(r)),new Error("Program link failed");e.useProgram(r);const x=new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),w=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,w);e.bufferData(e.ARRAY_BUFFER,x,e.STATIC_DRAW);const m=e.getAttribLocation(r,"position");e.enableVertexAttribArray(m);e.vertexAttribPointer(m,2,e.FLOAT,!1,0,0);const S=e.getUniformLocation(r,"resolution"),C=e.getUniformLocation(r,"time"),L=e.getUniformLocation(r,"mouse"),T=e.getUniformLocation(r,"rippleCenter"),A=e.getUniformLocation(r,"rippleTime");let a={x:0,y:0},c={x:0,y:0};const s=.15;function b(){a.x+=(c.x-a.x)*s,a.y+=(c.y-a.y)*s}t.addEventListener("mousemove",o=>{c={x:o.clientX,y:t.height-o.clientY}});t.addEventListener("mouseout",()=>{c={x:t.width/2,y:t.height/2}});let n={active:!1,center:{x:t.width/2,y:t.height/2},startTime:0,duration:1.8};t.addEventListener("click",o=>{n.center={x:o.clientX,y:t.height-o.clientY},n.startTime=performance.now()*.001,n.active=!0});function u(){const o=t.clientWidth,i=t.clientHeight;(t.width!==o||t.height!==i)&&(t.width=o,t.height=i,e.viewport(0,0,t.width,t.height))}window.addEventListener("resize",u);u();a={x:t.width/2,y:t.height/2};c={...a};function h(o){o*=.001,b();let i=10;n.active&&(i=o-n.startTime,i>n.duration&&(n.active=!1,i=10)),e.uniform2f(S,t.width,t.height),e.uniform1f(C,o),e.uniform2f(L,a.x,a.y),e.uniform2f(T,n.center.x,n.center.y),e.uniform1f(A,i),e.drawArrays(e.TRIANGLES,0,6),requestAnimationFrame(h)}requestAnimationFrame(h);
