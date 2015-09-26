
/*	Pull and Push menu in screen <768.
*****************/
var slideMenuMove = function()
{	
	if( window.slideTouchStartX <= 30 ) {
		//If touchX be smaller 31
		if( window.slideTouchMoveX > 40 ) { 
			//If touchX be bigger 40
			//Then open the menu
			document.getElementById("navigator").style.left = "0px";
		}
		return false;
	}

	if( (window.slideTouchStartX-20) > window.slideTouchMoveX ) {
		//If touchX be bigger for smaller
		//Then close the menu
		document.getElementById("navigator").style.left = "-180px";
	}
}

/* Removing all <sections> of <main>  */
var removeAllSections = function()
{
	var main = document.getElementsByTagName("main")[0];	
			
	while (main.firstChild) {
		main.removeChild(main.firstChild);
	}
}


/* Manipulation value of <meta> of 'network social' */
var setValueMetasSocial = function ( name, content )
{
	document.querySelector("meta[property='"+ name +"']").setAttribute("content", content);
}

/* Manipulation value of <meta> */
var setValueMetas = function ( name, content )
{
	document.querySelector("meta[name='"+ name +"']").setAttribute("content", content);
}



/* EVENT touchstart in document full
******************/
document.addEventListener('touchstart', function(event){
	window.slideTouchStartX = event.targetTouches[0].clientX;
}, false);


/* EVENT touchmove in document full
******************/
document.addEventListener('touchmove', function(event){	
	window.slideTouchMoveX = event.targetTouches[0].clientX;
	
	slideMenuMove();	
}, false);


/* EVENT touchend in document full
******************/
document.addEventListener('touchend', function(event){
	
	delete window.slideTouchStartX;
	delete window.slideTouchMoveX;
	delete window.slideTouchEndX;
}, false);



/* JSON for FRONT
*****************/
var jsonForFront = function( json )
{

	var main 	= document.getElementsByTagName("main")[0];
	var section = [],
		header = [],
		h1 = [],
		h2 = [],
		h5 = [],
		article = [];

	

	//If not found article
	if( json.length <= 0 ) {
		var section	= document.createElement("section");
		section.innerHTML = "<b>Ops.. Nenhum artigo encontrado. <h3 class='display-inline'>:(</h3> </b>";
		main.appendChild( section );
		return false;
	}

	//First loop
	for(n=0; n<json.length; n++) {
		//Creating the elements
		section[n] 	= document.createElement("section");
		header[n]  	= document.createElement("header");
		article[n] 	= document.createElement("article");
		h1[n] 		= document.createElement("h1");		
		h5[n] 		= document.createElement("h5");		

		//Link us posts
		if( location.pathname.indexOf("blog.html") > 0 || location.pathname.indexOf("post.html") > 0 ) {
			h1[n].innerHTML = "<a href='post.html#!/"+ json[n].ID +"'>"+ json[n].title +"</a>";			
		}
		else{
			h1[n].textContent = json[n].title;
		}

		
		//Manipulation values from in <head>
		if( location.pathname.indexOf("post.html") > 0 ){
			setValueMetas("description", json[n].title); //description
			setValueMetasSocial("og:description", json[n].title);//og:description
			setValueMetasSocial("og:title", json[n].title);		//og:title
			setValueMetasSocial("og:url", location.href);			//og:url
			document.title = json[n].title || "Não encontrado"; //title
		}

		//Content in the elements		
		h5[n].innerHTML	= json[n].date + " by <a href='#'>"+ json[n].author.username +"</a>";

		//BLOG: Show list post in excerpt
		if( location.pathname.indexOf("blog.html") > 0 ) {
			article[n].innerHTML	= json[n].excerpt;
		}	
		else {
			article[n].innerHTML	= json[n].content;
		}

		
		//View in action! :D
		header[n].appendChild( h1[n] );
		header[n].appendChild( h5[n] );
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



//var a = {"name":"Blog - Duduindo","description":"S\u00f3 mais um site WordPress","URL":"http:\/\/dudu.16mb.com\/blog","routes":{"\/":{"supports":["HEAD","GET"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/"}},"\/posts":{"supports":["HEAD","GET","POST"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/posts"},"accepts_json":true},"\/posts\/<id>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"],"accepts_json":true},"\/posts\/<id>\/revisions":{"supports":["HEAD","GET"]},"\/posts\/types":{"supports":["HEAD","GET"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/posts\/types"}},"\/posts\/types\/<type>":{"supports":["HEAD","GET"]},"\/posts\/statuses":{"supports":["HEAD","GET"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/posts\/statuses"}},"\/posts\/<id>\/comments":{"supports":["HEAD","GET"]},"\/posts\/<id>\/comments\/<comment>":{"supports":["HEAD","GET","DELETE"]},"\/users":{"supports":["HEAD","GET","POST"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/users"},"accepts_json":true},"\/users\/<id>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"],"accepts_json":true},"\/users\/me":{"supports":["HEAD","GET"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/users\/me"}},"\/posts\/<id>\/meta":{"supports":["HEAD","GET","POST"],"accepts_json":true},"\/posts\/<id>\/meta\/<mid>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"],"accepts_json":true},"\/media":{"supports":["HEAD","GET","POST"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/media"}},"\/media\/<id>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"]},"\/taxonomies":{"supports":["HEAD","GET"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/taxonomies"}},"\/taxonomies\/<taxonomy>":{"supports":["HEAD","GET"]},"\/taxonomies\/<taxonomy>\/terms":{"supports":["HEAD","GET"]},"\/taxonomies\/<taxonomy>\/terms\/<term>":{"supports":["HEAD","GET"]},"\/pages":{"supports":["HEAD","GET","POST"],"meta":{"self":"http:\/\/dudu.16mb.com\/blog\/wp-json\/pages"},"accepts_json":true},"\/pages\/<id>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"],"accepts_json":true},"\/pages\/<id>\/revisions":{"supports":["HEAD","GET"]},"\/pages\/<id>\/comments":{"supports":["HEAD","GET"]},"\/pages\/<id>\/comments\/<comment>":{"supports":["HEAD","GET","DELETE"]},"\/pages\/<path>":{"supports":["HEAD","GET","POST","PUT","PATCH","DELETE"],"accepts_json":true}},"authentication":[],"meta":{"links":{"help":"https:\/\/github.com\/WP-API\/WP-API","profile":"https:\/\/raw.github.com\/WP-API\/WP-API\/master\/docs\/schema.json"}}};



