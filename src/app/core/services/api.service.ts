import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Available app-wide
})
export class ApiService {

  constructor(
    private apollo: Apollo
  ) { }

  async executeQuery<T>(
    query: any,
    variables: any = {},
    fetchPolicy:
      | 'no-cache'
      | 'cache-first'
      | 'network-only'
      | 'cache-only' = 'no-cache'
  ): Promise<any | null> {
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
