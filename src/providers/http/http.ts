import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from '../../environments';

@Injectable()
export class HttpProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');
  }

  public get( url:string, params:any):Observable<Object> {

    return this.http.get(environment.API_BASE_URL + url, { params: new HttpParams({ fromObject: params}), reportProgress: true  })
  }

  public getPaginated( url:string, params:any, _options:any):Observable<Object> {
    let headers = new HttpHeaders()
    headers = headers.set('page', JSON.stringify(_options.page));
    headers = headers.set('per-page', JSON.stringify(_options.perPage));
    if(_options.sortId){
      headers = headers.set('sort-id', _options.sortId);
      headers = headers.set('sort-order', _options.sortOrder);
    }
    return this.http.get(environment.API_BASE_URL + url, { headers: headers, params: new HttpParams({ fromObject: params }) })
  }

  public post( url:string, body:any, params:any):Observable<Object> {
    
    return this.http.post(environment.API_BASE_URL + url, body, { params: new HttpParams({ fromObject: params }) })
  }

  public delete(url:string,  params:any):Observable<Object> {
    
    return this.http.delete(environment.API_BASE_URL + url, { params: new HttpParams({ fromObject: params }) })
  }
}
