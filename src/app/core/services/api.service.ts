import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Query } from '../types';

@Injectable({
  providedIn: 'root', // Available app-wide
})
export class ApiService {

  private baseUrl: string;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    @Inject('API_CONFIG') private apiConfig: { baseUrl: string }
  ) {
    this.baseUrl = this.apiConfig.baseUrl;
  }

  // REST API Methods
  get<T>(endpoint: string, params?: HttpParams | any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any, params?: HttpParams | any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { params });
  }

  put<T>(endpoint: string, body: any, params?: HttpParams | any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { params });
  }

  patch<T>(endpoint: string, body: any, params?: HttpParams | any): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { params });
  }

  delete<T>(endpoint: string, params?: HttpParams | any): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  // REST API Methods
  asyncGet<T>(endpoint: string, params?: HttpParams | any): Promise<T> {
    return lastValueFrom(this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params }));
  }

  asyncPost<T>(endpoint: string, body: any, params?: HttpParams | any): Promise<T> {
    return lastValueFrom(this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { params }));
  }

  asyncPut<T>(endpoint: string, body: any, params?: HttpParams | any): Promise<T> {
    return lastValueFrom(this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { params }));
  }

  asyncPatch<T>(endpoint: string, body: any, params?: HttpParams | any): Promise<T> {
    return lastValueFrom(this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, { params }));
  }

  asyncDelete<T>(endpoint: string, params?: HttpParams | any): Promise<T> {
    return lastValueFrom(this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { params }));
  }

  async executeQuery<T>(
    query: any,
    variables: any = {},
    fetchPolicy:
      | 'no-cache'
      | 'cache-first'
      | 'network-only'
      | 'cache-only' = 'no-cache'
  ): Promise<Query | any | null> {
    try {
      const result = await lastValueFrom(
        this.apollo
          .query<any>({
            query: query,
            variables: variables,
            fetchPolicy: fetchPolicy,
          })
          .pipe(map((response: any) => response?.data))
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  async executeMutation<T>(
    query: any,
    variables: any = null,
    multipart: boolean = false
  ): Promise<any | null | undefined> {
    const useMultipart = !!variables?.file && variables.file instanceof File;
    try {
      const result = await lastValueFrom(
        this.apollo
          .mutate<any>({
            mutation: query,
            variables: variables,
            context: {
              useMultipart: useMultipart || multipart
            },
          })
          .pipe(map((response: any) => response?.data))
      );
      return result;
    } catch (error) {
      return null;
    }
  }

  /**
   * Execute GraphQL subscription
   * @param subscription - GraphQL subscription query
   * @param variables - Variables for the subscription
   * @returns Observable that emits subscription data
   */
  executeSubscription<T = any>(
    subscription: any,
    variables: any = {}
  ): Observable<T | null> {
    return this.apollo
      .subscribe<T>({
        query: subscription,
        variables: variables,
      })
      .pipe(
        map((response: any) => response?.data || null)
      );
  }
}
