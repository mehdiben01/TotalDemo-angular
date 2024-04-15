import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProducts(page: number = 1, size: number = 4): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8089/products?_page=${page}&_limit=${size}`);
  }


  public checkProducts(product: Product){
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`,
      {checked: !product.checked});
  }
  public deleteProduct(product: Product){
    return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(`http://localhost:8089/products`,
      product);
  }
  public searchProducts(keyword:string){
    return this.http.get<Array<Product>>(`http://localhost:8089/products?name=${keyword}`);
  }

  getProductsById(productId: number) {
    return this.http.get<Product>(`http://localhost:8089/products/${productId}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product);
  }
}
