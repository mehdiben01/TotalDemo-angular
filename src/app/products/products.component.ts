import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  constructor(private ps:ProductService, private router:Router) {
  }
  products : Array<Product> = []
  keyword: string="";
  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;
  totalProducts: number = 0;
  pages: number[] = [];


  handleCheckProduct(product: Product) {
    this.ps.checkProducts(product).subscribe({
      next: updatedProduct =>{
        //product.chekced=!product.chekced;
        this.getProducts();
      }
    })


  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(page: number = 1): void {
    this.ps.getProducts(page, this.pageSize)
      .subscribe({
        next: data => {
          this.products = data;
          // Calcul du nombre total de produits
          this.totalProducts = this.currentPage * this.pageSize + data.length - this.pageSize;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getPage(page: number): void {
    this.currentPage = page;
    this.getProducts(page);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.getPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getPage(this.currentPage + 1);
    }
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

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
