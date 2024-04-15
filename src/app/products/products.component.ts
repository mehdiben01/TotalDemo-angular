import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService) {
  }
  products : Array<Product> = []
  keyword: string="";

  handleCheckProduct(product: Product) {
    this.ps.checkProducts(product).subscribe({
      next: updatedProduct =>{
        //product.chekced=!product.chekced;
        this.getProducts();
      }
    })


  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(){
    this.ps.getProducts().subscribe({next: data => {this.products = data}, error :err => {console.log(err);} });
  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
    this.ps.deleteProduct(product).subscribe({
      next: value => {
        this.products.filter(p=>p.id!=product.id);
      }
    });
  }

  searchProduct() {
   this.ps.searchProducts(this.keyword).subscribe({
     next: value => {
       this.products=value;
     }
   })
  }
}
