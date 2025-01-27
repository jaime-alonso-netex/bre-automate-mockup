import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UsersResponse } from '../interfaces/usersResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersUrl = 'assets/data/users.json'; 
  private pageSize = 25;

  constructor(private http: HttpClient) {}

  // Método para obtener los datos de usuarios
  getUsers(page: number = 1): Observable<UsersResponse> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        const paginatedUsers = users.slice(startIndex, endIndex);
        return {
          data: paginatedUsers,
          hasMore: endIndex < users.length
        } as UsersResponse;
      })
    );
  }

  countUsers(): Observable<number> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => users.length)
    );
  }
}
