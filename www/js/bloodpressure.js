
function check(){ 
  var a =Number(document.getElementById("sp").value);
 var b =Number(document.getElementById("dp").value);
if(a<b){
    alert("Systolic pressure (SP) is greater than Diastolic pressure (DP)!");
    }
    
  else{
    calculatesysdi();
  }
  }
function calculatesysdi(){
 
var a =Number(document.getElementById("sp").value);
 var b =Number(document.getElementById("dp").value);
var pp =a-b;
 var fma=2*b;
  var sma=fma+a;
  var map=Math.round(sma/3);
  document.getElementById("FINISH").innerHTML+="<br>Mean Artereial Pressure (MAP) "+" = "+map;
  var Pp="Pulse Pressure (PP) = ";
  var status="Blood pressure status : ";
  if (a<120 && b<80){
      document.getElementById("FINISH").innerHTML+="<br>"+status+"Normal Blood Pressure";
      }
  else if(a>119&&a<140 || b>79&&b<90){
      document.getElementById("FINISH").innerHTML+="<br>"+status+"Pre-hypertension";
      }
  else if(a>139&&a<160 || b>89&&b<100){
          document.getElementById("FINISH").innerHTML+="<br>"+status+"Stage I high blood pressure-hypertension";
          }
  else if(a>159&&a<181 || b>99&&b<111){
          document.getElementById("FINISH").innerHTML+="<br>"+status+"Stage II high blood pressure-hypertension";
          }
  else if(a>180 || b>110){
          document.getElementById("FINISH").innerHTML+="<br>"+status+"Hypertensive crisis(where emergency care is required)";
          }
  document.getElementById("FINISH").innerHTML+="<br>"+Pp+pp;
    
}