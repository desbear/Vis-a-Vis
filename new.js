var rightclose= "<div class='rclose'><a href='#'>close</a></div>";
var rightopen= "<div class='ropen'><a href='#'>open</a></div>";
var boxw= $(".b50");
var captiondec= "<div class='captiondec'></div>";
var rheight= $('#right').height();
function displayno(){ $('.callreportbox').css('display','none')}
function displayon(){ $('.callreportbox').css('display','block')}


//
$(document).ready(function() {


 $('#file>li:last').css('background','none');   


$('.opentype').click(function(){

                                       window.setTimeout('displayon()',50);
                                       $('.callreportbox').animate({opacity:"1",width:"97%",minHeight:"300px"},700);
                                       $('.opentype').animate({opacity:"0",width:"0px"},700);
                                       $('.closetype').animate({opacity:"1",width:"29px"},900);
                                       
                                      
                                           } ); 
 $('.closetype').click(function(){
                                       $('.callreportbox').animate({opacity:"0",width:"0px",minHeight:"0px"},700);
                                       $('.opentype').animate({opacity:"1",width:"29px"},700);
                                       $('.closetype').animate({opacity:"0",width:"0px"},900);
                                       window.setTimeout('displayno()',1000);
                                      
                                           } ); 


$("input, textarea, select, button").uniform();
 
});