import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  routes: Array<RoutesName> = [{name: 'Home', path: '/home'}];
  isRouterLogin: boolean = false;
  isShown = false;
  constructor(
      private titleService: Title,
      private router: Router){    
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url == '/login' || this.router.url == '/new-user'){
          this.isRouterLogin = true
        } else{
          this.isRouterLogin = false
        }
          this.routes = [{name: 'Home', path: '/home'}];
          this.titleService.setTitle('Home');
          setTimeout(() => {
            this.getRoutesToDisplay();
          });
        }    
    });
  }

  toggle() { 
      this.isShown = !this.isShown;
      console.log(this.isShown);
  }

  getRoutesToDisplay() {
    let path = this.router.url;
  
    if (path !== '/home') {
      if (path[0] === '/')
        path = path.slice(1, path.length);
  
      const pathsRoute = path.split('/');
  
      for (let i = 0; i < pathsRoute.length; i++) {
        pathsRoute[i] = pathsRoute[i].replace(/\?{1}[\d\D=]+/g, '');
        const title = this.brPaths(pathsRoute[i]);
        this.titleService.setTitle(title);
        this.routes.push({path: pathsRoute[i], name: title});
      }
    }
  }
  
  brPaths(path: string): string {
    switch(path) {
      case 'login':
        return 'Login';
      case 'home':
        return 'Home';
      case 'material':
        return 'Materiais';
      case 'new-material':
        return 'Novo Material';
      case 'edit-material':
        return 'Editar Material';
      case 'new-user':
        return 'Cadastre-se';
      case 'clients':
        return 'Clientes';
      case 'new-client':
        return 'Novo Cliente';
        case 'edit-client':
          return 'Novo Cliente';
    }
    return `@-> ADICIONAR TRADUCAO ${path}`;
  }
  
  
}


export class RoutesName {
  name: string;
  path: string;

  constructor() {
    this.name = '';
    this.path = '';
  }
}
