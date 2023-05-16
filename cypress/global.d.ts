/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
    logout(username: string): Chainable<void>;
    register(flag: number, target: '+' | '1/2'): Chainable<void>;
    typeScore(
      myScore: number | string,
      enemyScore: number | string,
      success: boolean
    ): Chainable<void>;
  }
}
