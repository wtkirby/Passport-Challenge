import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class FactoryService {

  constructor(private http: Http) { }
    getFactories(): Observable<any> {
    return this.http.get('/api/factory')
      .map(
        (response: Response) => {
          console.log(response.json());
          return response.json();
        }
      );
  }
}
