import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState: any = {
    products : [],
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    totalProducts:  0,
    pages: [],
    status:"",
    errorMessage: ""
  }

  constructor() { }

  public setProductState(state: any):void{
    this.productState={...this.productState,state}
  }
}
