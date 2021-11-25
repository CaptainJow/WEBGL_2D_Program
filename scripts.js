var gl, program;
var color = [0.5, 0.1, 1.0, 1];
var theta = 0.0;
var thetaLoc , scaleLoc;
var scaleFactor = 1 ;
var slider_val_start = document.getElementById("myRange").value = "50";

window.onload = function init() {
    var triangle = new Float32Array(
        [    0.3,-0.5 ,  //J vecs
            0.5,-0.5 , 
            0.5 ,0.5  ,
            0.3 , -0.5 ,
            0.3 , 0.5 ,
           0.5 ,0.5 , 

            0.5 , -0.5 ,
            0.3 , -0.5 , 
            0.3 , -0.8 , 
            0.3 , -0.8 , 
            0.15 ,  -0.7 ,
            0.3 , -0.5 ,

            0.3 , -0.8 ,
            0.3  , -0.63 , 
            0.1 ,  -0.8 ,
            0.1  , -0.63 ,
            0.1 ,  -0.8 , 
            0.3 , -0.63 ,
             
            0.1 , -0.8 , 
            0.2 , -0.63 , 
            0.0 ,  -0.5 ,
            
            0.0 , -0.5 , 
            0.0 , -0.7 ,
            0.1 , -0.8 ,
            //Y vecs 
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
    gl = canvas.getContext( "webgl" );
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
    scale_loc = gl.getUniformLocation(program, "scale");
    window.addEventListener("keydown", checkKeyPressed); 
    
    requestAnimationFrame( render );
}

function render() {
    
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f( thetaLoc, theta );
    var colorLocation = gl.getUniformLocation(program, "u_color");
    gl.uniform4fv(colorLocation, color);
    gl.uniform1f(scale_loc, scaleFactor);
    gl.drawArrays(gl.TRIANGLES, 0, 42);
   

    requestAnimationFrame( render );
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
function scaling(val) {
    scaleFactor = val /100 +0.5 ;
}
var mixBut = document.getElementById("mixBut");

mixBut.addEventListener("click", color_party); 
//COLOR 
function color_party() {
   for( let i = 1 ; i <2000  ; i++){
          task(i) ;  
       
    }
 mixBut.removeEventListener("click", color_party);
 mixBut.addEventListener("click", Stop);
 mixBut.value = "Stop";

  } 
  
  //the stop function
  function Stop(){
    console.log("Stopped");
    mixBut.removeEventListener("click", Stop);
    mixBut.addEventListener("click", color_party);
    window.location.reload();
}

//this task function generates random colors and moves the object
function task(i){
   setTimeout(function(){
        color = [Math.random(), Math.random(), Math.random(), 1];
        theta += 0.15*i;
        theta -= 0.1*i;
     },150 * i)
 }

