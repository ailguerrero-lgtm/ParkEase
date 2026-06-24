//ENRUTAMIENTO CLIENTE

class Router{
    constructor(routes){
        this.routes = routes;
        this.init();
    }
    init(){
        //ESCUCHA CAMBIOS EN LA URL ADELNTE ATRAS EN EL NAVEGADOR
        window.addEventListener('postate',()=> this.route());
        //INTERPRETA CLICS PARA NAVEGACION INTERNA SIN RECARGAR
        document.addEventListener('click', (e)=> {
            if(e.target.matches('[data-link]')){
                e.preventDefault();
                this.navigateTo(e.target.hred);
            }
        });

        this.route();
    }
    navigateTo(url){
        history.pushState(null,null, url);
        this.route();
    }
    route(){
        const path =window.location.pathname;
        const route = this.routes[path] || this.route['404'];

        //RENDERIZAR EL COMPONENTE EN EL CONTENEDOR PRINCIPAL
        document.getElementById('app').innerHTML = route.render();
        //SE EJECUTA LA LOGICA DEL COMPONENTE DESPUES DE RENDERIZAR
        if(route.mounted) route.mounted();
    }
}