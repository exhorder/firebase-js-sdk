/**
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * THIS FILE IS FOR INTERNAL USAGE ONLY, IF YOU ARE NOT DEVELOPING THE FIREBASE
 * SDKs, PLEASE DO NOT REFERENCE THIS FILE AS IT MAY CHANGE WITHOUT WARNING
 */

import { FirebaseApp, FirebaseNamespace } from '@firebase/app-types';
import { Observer, Subscribe } from '@firebase/util';
import { FirebaseError } from '@firebase/util';

export interface FirebaseServiceInternals {
  /**
   * Delete the service and free it's resources - called from
   * app.delete().
   */
  delete(): Promise<void>;
}

// Services are exposed through instances - each of which is associated with a
// FirebaseApp.
export interface FirebaseService {
  app: FirebaseApp;
  INTERNAL?: FirebaseServiceInternals;
}

export type AppHook = (event: string, app: FirebaseApp) => void;

/**
 * Firebase Services create instances given a Firebase App instance and can
 * optionally add properties and methods to each FirebaseApp via the extendApp()
 * function.
 */
export interface FirebaseServiceFactory {
  (
    app: FirebaseApp,
    extendApp?: (props: { [prop: string]: any }) => void,
    instanceString?: string
  ): FirebaseService;
}

/**
 * All ServiceNamespaces extend from FirebaseServiceNamespace
 */
export interface FirebaseServiceNamespace<T extends FirebaseService> {
  (app?: FirebaseApp): T;
}

export interface FirebaseErrorFactory<T> {
  create(code: T, data?: { [prop: string]: any }): FirebaseError;
}

export interface FirebaseErrorFactoryClass {
  new (
    service: string,
    serviceName: string,
    errors: { [code: string]: string }
  ): FirebaseErrorFactory<any>;
}

export interface FirebaseAuthTokenData {
  accessToken: string;
}
