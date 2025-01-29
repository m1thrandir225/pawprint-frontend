import type { Component } from 'vue'
export {}

declare module 'vue-router' {
  interface RouteMeta {
    layout: Component
    requiresAuth: boolean
    //TODO: remove null check on the values of these properties when implementing the middleware
    requiresShelter?: boolean
    requiresUser?: boolean
    requiresAdmin?: boolean
  }
}
