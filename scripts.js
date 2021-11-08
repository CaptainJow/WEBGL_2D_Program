var gl, program;
var color = [0.5, 0.1, 1.0, 1];
var theta = 0.0;
var thetaLoc;


window.onload = function init() {

    var triangle = new Float32Array(
        [   0.05, -0.7 ,
            -0.1 , -0.7 ,
             0.3 , 0.3 , 
             0.3 , 0.3 , 
             0.35 , 0.17 ,
             0.05 , -0.7 ,

             0.55, -0.7 ,
             0.7 , -0.7 ,
              0.3 , 0.3 , 
              0.3 , 0.3 , 
              0.25 , 0.17 ,
              0.55 , -0.7 ,

              0.08 , -0.4 ,
               0.52 , -0.4 , 
               0.52 , -0.3  ,
               0.08 , -0.4 ,
               0.52 , -0.3 , 
               0.08 , -0.3  , 

                -0.4,-0.7 ,
                -0.2,-0.7 , 
                -0.2 ,0.3  ,
                -0.4 , -0.7 ,
                -0.4 , 0.3 ,
               -0.2 ,0.3  , 

               -0.2 , 0.1 , 
               0.1 , 0.5 ,
               -0.4 , 0.3 , 
               0.1 , 0.5 ,
               -0.4 , 0.2 , 
               -0.05 , 0.65 ,

               -0.7 , 0.5 ,
               -0.2 , 0.2 , 
               -0.55 , 0.65,
               -0.4 , 0.1 , 
               -0.7 , 0.5 ,
                -0.2 , 0.3 
        ]);

    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext( "experimental-webgl" );
    if (!gl) { alert("WebGL isn’t available"); }


    gl.viewport(0, 0, canvas.width, canvas.height); 
    gl.clearColor(0.0, 0.0, 0.0, 0.30);

    program = initShaders(gl,"vertex-shader","fragment-shader"); 
    gl.useProgram(program);

    var colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);

    var vbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbuffer);
    gl.bufferData( gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW );
    


    var vPosition = gl.getAttribLocation(program, "vPosition"); 
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0); 
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation( program, "theta" );
    
    window.addEventListener("keydown", checkKeyPressed); 
    
    requestAnimationFrame( render );
}

function render(time_ms) {
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f( thetaLoc, theta );
    var colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);
    
    gl.drawArrays(gl.TRIANGLES, 0, 36);
   

    requestAnimationFrame( render  );
}


function checkKeyPressed(e) {

    if (e.keyCode == "82") {
        color = [Math.random(), Math.random(), Math.random(), 1];
    }
    if(e.keyCode =="68"){
        theta -= 0.05;
    }
    if(e.keyCode =="65"){
        theta += 0.05;
    }
 


}

var mixBut = document.getElementById("mixBut");
var TIMER  ;


mixBut.addEventListener("click", color_party); 
function color_party() {
   for( let i = 1 ; i <2000  ; i++){
          task(i) ;  
       
    }
 mixBut.removeEventListener("click", color_party);
 mixBut.addEventListener("click", Stop);
 mixBut.value = "Stop";

  } 
  
  
  function Stop(){
    console.log("Stopped");
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", color_party);
    mixBut.value = "Start";
    window.location.reload();
}


function task(i){
   TIMER = setTimeout(function(){
        color = [Math.random(), Math.random(), Math.random(), 1];
        theta += 0.15*i;
        theta -= 0.1*i;
     },150 * i)
 }
 