const express = require('express');
const Book = require('./data/models/Book');
const User = require('./data/models/User');
const Action = require('./data/models/Action');
const Repository = require('./data/Repository');
const BooksService = require('./business/services/BooksService');
const UsersService = require('./business/services/UsersService');
const ActionsService = require('./business/services/ActionsService');
const BooksController = require('./business/controllers/BooksController');
const UsersController = require('./business/controllers/UsersController');
const ActionsController = require('./business/controllers/ActionsController');
const middleware = require('./utils/middleware');
const db = require('./data/db');

class Container {
  constructor() {
    this._services = new Map();
    this._singletons = new Map();
  }

  register(name, definition, dependencies) {
    this._services.set(name, { definition, dependencies });
  }

  singleton(name, definition, dependencies) {
    this._services.set(name, { definition, dependencies, singleton: true });
  }

  memorize(name, definition, dependencies) {
    this._services.set(name, { definition, dependencies, alreadyCreated: true });
  }

  get(name) {
    const c = this._services.get(name);

    if (this._isClass(c.definition)) {
      if (c.alreadyCreated) {
        const singletonInstance = this._singletons.get(name);
        if (singletonInstance) {
          return singletonInstance;
        }
        this._singletons.set(name, c.definition);
        return c.definition;
      }
      if (c.singleton) {
        const singletonInstance = this._singletons.get(name);
        if (singletonInstance) {
          return singletonInstance;
        }
        const newSingletonInstance = this._createInstance(c);
        this._singletons.set(name, newSingletonInstance);
        return newSingletonInstance;
      }
      return this._createInstance(c);
    }
    return c.definition;
  }

  _getResolvedDependencies(service) {
    let classDependencies = [];
    if (service.dependencies) {
      classDependencies = service.dependencies.map((dep) => this.get(dep));
    }
    return classDependencies;
  }

  _createInstance(service) {
    return new service.definition(...this._getResolvedDependencies(service));
  }

  _isClass(definition) {
    return typeof definition === 'function';
  }
}

const container = new Container();

container.singleton('server', express);
container.singleton('db', db);
container.register('router', express.Router);

container.memorize('book', Book);
container.memorize('user', User);
container.memorize('action', Action);

container.singleton('booksRepo', Repository, ['book']);
container.singleton('usersRepo', Repository, ['user']);
container.singleton('actionsRepo', Repository, ['action']);

container.singleton('booksService', BooksService, ['booksRepo']);
container.singleton('usersService', UsersService, ['usersRepo']);
container.singleton('actionsService', ActionsService, ['actionsRepo', 'usersRepo', 'booksRepo']);

container.singleton('booksController', BooksController, ['router', 'booksService', 'middleware']);
container.singleton('usersController', UsersController, ['router', 'usersService', 'middleware']);
container.singleton('actionsController', ActionsController, ['router', 'actionsService', 'middleware']);

container.register('middleware', middleware, ['usersService']);

module.exports = container;
