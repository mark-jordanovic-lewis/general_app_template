import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

import { IndexProduct, ShowProduct } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class ProductService {
  productsUrl: string = '/api/products';
  productUrl: string = '/api/product';
  purchaseUrl: string = '/api/purchase';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { this.log(`ProductService up. url: ${this.productsUrl}`); }

  products(): Observable<IndexProduct[]> {
    var pagination = { paginate: {page: 1, per_page: 30} };
    return this.http
               .post<IndexProduct[]>(this.productsUrl, pagination, httpOptions)
               .pipe(
                 tap(_ => this.log('fetched products')),
                 catchError(this.handleError<IndexProduct[]>('ProductService#products', [])));
  }

  product(product_id): Observable<ShowProduct> {
    var body = { product_id: product_id };
    return this.http
               .post<ShowProduct>(this.productUrl, body, httpOptions)
               .pipe(
                 tap(_ => this.log('fetched product')),
                 catchError(this.handleError<ShowProduct>('ProductService#product')));
  }

  purchase(product_id): Observable<any> {
    var body = { product_id: product_id };
    return this.http
               .post<any>(this.purchaseUrl, body, httpOptions)
               .pipe(
                 tap(_ => this.log('bought product')),
                 catchError(this.handleError<any>('ProductService#purchase')));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
}
