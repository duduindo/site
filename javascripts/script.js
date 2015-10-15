
//IE not support render SVG in CSS / :@
var IEshitWithSVG = function ()
{
	if( navigator.appVersion.indexOf("MSIE") > 0 || navigator.appVersion.indexOf("msie") > 0 ){
		document.getElementsByClassName("roda-gigante")[0].src = "images/light-rays.png";
		document.getElementsByClassName("nuvens")[0].src = "images/t1.png";
		document.getElementsByClassName("nuvens")[1].src = "images/t2.png";
		document.getElementsByClassName("nuvens")[2].src = "images/t3.png";
	}
}



document.addEventListener("DOMContentLoaded", function(){

	IEshitWithSVG();
}, false);


//Event on
var On = function(attr, selector, functions)
{	
	[].forEach.call(document.querySelectorAll(selector), function(el) {
	  el.addEventListener(attr, function(event) {
	    return functions(el, event);
	  })
	});
}


var el = function( el ) 
{
	return document.querySelectorAll( el );
}


//Mousemove no efeito
On('mousemove', '.nuvens', function(este, evento){	

	switch( evento.movementX ) {

    	case -1: {
    		el(".nuvens")[0].style.left = "-80px";
    		el(".nuvens")[1].style.left = "-30px";
    		el(".nuvens")[2].style.left = "-50px";    		
    	} break;
  	

    	case 0: {
    		el(".nuvens")[0].style.left = "-10px";
    		el(".nuvens")[1].style.left = "-90px";
    		el(".nuvens")[2].style.left = "-30px";    		
    	} break;

    	case 1: {
    		el(".nuvens")[0].style.left = "-90px";
    		el(".nuvens")[1].style.left = "-10px";
    		el(".nuvens")[2].style.left = "-80px";    		
    	} break;

    }

});


/* Manipulation value of <meta> */
var setValueMetas = function ( name, content )
{
	document.querySelector("meta[name='"+ name +"']").setAttribute("content", content);
}


/* Manipulation value of <meta> of 'network social' */
var setValueMetasSocial = function ( name, content )
{
	document.querySelector("meta[property='"+ name +"']").setAttribute("content", content);
}

/* Removing all <sections> of <main>  */
var removeAllSections = function()
{
	var main = document.getElementsByTagName("main")[0];
	var section = main.getElementsByTagName("section");

	for(n=0; n<section.length; n++) {
		main.removeChild( section[n] );
	}
			
	
}


/* JSON for FRONT
*****************/
var jsonForFront = function( json )
{

	var main 	= document.getElementsByTagName("main")[0];
	var section = [],
		header = [],				
		article = [],
		h3 = [];


	//If not found article
	if( json.length <= 0 ) {
		var section	= document.createElement("section");
		section.innerHTML = "<article><b><p style='color: #FF9898;'>Ops.. Nenhum artigo encontrado. :(</p> </b></article>";
		main.appendChild( section );
		return false;
	}


	//Master loop content
	for(n=0; n<json.length; n++) {
		//Creating the elements
		section[n] 	= document.createElement("section");
		header[n]  	= document.createElement("header");
		article[n] 	= document.createElement("article");
		h3[n] 		= document.createElement("h3");


		//Link us posts
		if( location.pathname.indexOf("blog.html") > 0 || location.pathname.indexOf("post.html") > 0 ) {
			h3[n].innerHTML = "<a href='post.html#!/"+ json[n].ID +"'>"+ json[n].title +"</a>";			
		}
		else{
			h3[n].textContent = json[n].title;
		}

		//Manipulation values from in <head>
		if( location.pathname.indexOf("post.html") > 0 ){
			setValueMetas("description", json[n].title); //description
			setValueMetasSocial("og:description", json[n].title);//og:description
			setValueMetasSocial("og:title", json[n].title);		//og:title
			setValueMetasSocial("og:url", location.href);			//og:url
			document.title = json[n].title || "Não encontrado"; //title
		}

		//BLOG: Show list post in excerpt
		if( location.pathname.indexOf("blog.html") > 0 ) {
			article[n].innerHTML	= json[n].excerpt;//Exemple: "The conte.."
		}	
		else {
			article[n].innerHTML	= json[n].content;//Exemple: "The content"
		}

		//View in action! :D
		header[n].appendChild( h3[n] );		
		section[n].appendChild( header[n]  );
		section[n].appendChild( article[n] );
		main.appendChild( section[n] );
	}
	
}







/* MODEL - BACKEND
*****************/
window._servidor = "http://dudu.16mb.com/blog/wp-json/";
window._alertFailConnection = "Oh não! Houve uma falha na conexão.<br/><br/> <button onclick='location.reload()'>Tentar novamente</button>";

/*
	categories: blog, contatos, portfolio, projetos
*/
var getPosts = function ( category )
{
	$.getJSON( window._servidor + "posts?_jsonp=?", { 'filter[category_name]':category }, function() {})
    .done(function( data ){        
       console.log(data)
       removeAllSections();
       jsonForFront( data );       
    })
    .fail(function() {       
       document.getElementsByTagName("main")[0].getElementsByTagName("section")[0].innerHTML = window._alertFailConnection;
    });
}


/*
	Number page
*/
var getNumberPost = function ( number )
{
	$.getJSON( window._servidor + "posts?_jsonp=?", { 'filter[p]':number }, function() {})
    .done(function( data ){        
       console.log(data);
       removeAllSections();
       jsonForFront( data );
    })
    .fail(function() {
       document.getElementsByTagName("main")[0].getElementsByTagName("section")[0].innerHTML = window._alertFailConnection;
    });
}