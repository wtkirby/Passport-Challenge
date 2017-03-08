import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FactoryService {

  constructor(private http: Http) { }

  getFactories(): Observable<any> {
    return this.http.get('/api/factory')
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }
    
  addFactory(factory: String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/factory', factory, options)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  updateFactory(factoryId: String, newData: String): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put('/api/factory/' + factoryId, newData, options)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

  deleteFactory(factoryId: String): Observable<any> {
    return this.http.delete('/api/factory/' + factoryId)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

    generateChildren(factoryId: String, amountToGenerate: Number): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/factory/' + factoryId + '/generateChildren', JSON.stringify({ amount: amountToGenerate}), options)
      .map(
        (response: Response) => {
          return response.json();
        }
      );
  }

}
