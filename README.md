# ServerlessFramework Plugin

## Embedded env in Code

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
