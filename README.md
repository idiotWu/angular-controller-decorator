## angular-controller-decorator

[![NPM](https://nodei.co/npm/angular-controller-decorator.png)](https://nodei.co/npm/angular-controller-decorator)

This is a small decorator function that helps you inject dependencies into angular controllers' prototype method.

### Install

```
npm install angular-controller-decorator --save
```

### Usage

```javascript
// in index.js

import decorator from 'install angular-controller-decorator';
import AppController from './controller';

angular.module('app', [])
    .controller( 'AppController', decorator(AppController) );
```

```javascript
// in controller.js

class AppController {
    static $inject = ['$rootScope', '$http'];

    constructor ($rootScope, $http) {
        this.getConfig('http://example.org')
            .then(this.setGlobalConfig);
    }

    setGlobalConfig(config) {
        // you can get dependencies through `this.injections` property
        let { $rootScope } = this.injections;
        $rootScope.config = config;
    }

    getConfig(url) {
        let { $http } = this.injections;

        return $http.get(url);
    }
}

export default AppController;

```