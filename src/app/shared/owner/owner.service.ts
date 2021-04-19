import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNERS_API = this.API + '/owners';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.OWNERS_API);
  }

  getByDni(dni: string) {
    return this.http.get(this.OWNERS_API + '/search/findByDni?dni=' + dni);
  }

  getOwner(id: string) {
    return this.http.get(this.OWNERS_API + '/' + id);
  }

  post(owner: any) {
    return this.http.post(this.OWNERS_API, owner);
  }

  put(url: string, owner: any) {
    return this.http.put(url, owner);
  }

  delete(url: string, ) {
    return this.http.delete(url);
  }

}
