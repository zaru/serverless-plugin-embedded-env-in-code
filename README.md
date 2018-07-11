[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![npm version](https://badge.fury.io/js/serverless-plugin-embedded-env-in-code.svg)](https://badge.fury.io/js/serverless-plugin-embedded-env-in-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Embedded env in Code
## ServerlessFramework Plugin

This plugin will replace environment variables with static strings before deployment.
It’s for Lambda@Edge.

## Usage

`serverless.yml`

```yaml
functions:
  foobar:
    handler: foobar.perform
    embedded:
      files:
        - foobar.js
        - foobar-lib.js
      variables:
        FooBar: somethingA
        BarBaz: somethingB
```

For example

```javascript
const foobar = process.env.FooBar
const barbaz = `${process.env.BarBaz} <= barbaz`
```

replaces

```javascript
const foobar = 'somethingA'
const barbaz = `somethingB <= barbaz`
```
