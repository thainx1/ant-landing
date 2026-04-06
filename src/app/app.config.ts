import { LayoutModule } from '@angular/cdk/layout';
import { ApplicationConfig, importProvidersFrom, inject, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from "@apollo/client/utilities";
import Aura from '@primeuix/themes/aura';
import { provideNamedApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { storageKey } from './core/constants/storage-key';

export const _provideNamedApollo = provideNamedApollo(() => {
  const httpLink = inject(HttpLink);
  const http = httpLink.create({
    uri: environment.apiGraphQL,
    // extractFiles: body => extractFiles(body),
  })
  const ws = new GraphQLWsLink(
    createClient({
      url: environment.socket,
      connectionParams: async () => {
        const token = localStorage.getItem(storageKey.token) || '';
        return {
          authorization: `Bearer ${token}`,
        };
      },
      on: {
        connected: () => console.log('WebSocket connected'),
        error: (error) => console.error('WebSocket error:', error),
      },
    })
  );
  const link = ApolloLink.split(({ query }) => {
    const operationDefinitionNode = getMainDefinition(query);
    return operationDefinitionNode.kind === 'OperationDefinition' && operationDefinitionNode.operation === 'subscription';
  }, ws, http)
  return {
    default: {
      link: link,
      cache: new InMemoryCache(),
    },
  }
})
export const appConfig: ApplicationConfig = {
  providers: [
    _provideNamedApollo,
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withViewTransitions()
    ),
    provideClientHydration(),
    importProvidersFrom(LayoutModule),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    {
      provide: 'API_CONFIG',
      useValue: { baseUrl: environment.apiRestFull },
    },
  ]
};
