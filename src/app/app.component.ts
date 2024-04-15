import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'totaldemo-app';
  actions : Array<any> = [
    {
      title: "home", route : "/home", icon :"house"
    },
    {
      title: "Products", route : "/products", icon :"search"
    },
    {
      title: "New Product", route : "/new-product", icon :"save"
    },

  ];
  currentAction : any;

  setCurrentAction(action: any) {
    this.currentAction = action;

  }
}
