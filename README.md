# bad-server

A middleware that will degrade your express server's performance.

## Why would you want this?

Developers often forget to account for API issues when building applications. Sometimes there might be network issues, sometimes the server might be unreachable for some reason. This middleware will help you build applications that are resilient to such situations by forcing you to handle them in development.

## Installation

`npm install bad-server`

## Usage

```ts
import { badServer } from "bad-server";
```

### Application Level

```ts
app.use(badServer());
```

### Route level

```ts
router.get("/api", badServer(), (req, res, next) => res.send("Hello World"));
```

## Options

`badServer` accepts a single options parameter that you can use to configure how the middleware should work. The default options are used if no options are specified.

| Option         | Default   | Description                                                                                |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| **delay**      | -         | Fixed amount of delay for the response in milliseconds, takes precedence over `maxDelay`   |
| **maxDelay**   | 250       | Variant amount of delay for the response in milliseconds                                   |
| **failRate**   | 0.1 (10%) | A number between 0 and 1 expressing the likelyhood of rejecting a request with a 500 error |
| **httpStatus** | -         | Causes the request to resolve with the specified HTTP status code and `response`           |
| **response**   | -         | Response body used with `httpStatus`                                                       |

### Examples

#### Responding to requests with a 3-second delay

```ts
badServer({ delay: 3000 });
```

#### Responding to requests with a random delay up to 1 second

```ts
badServer({ maxDelay: 1000 });
```

#### Rejecting 50% of the requests

```ts
badServer({ failRate: 0.5 });
```

#### Responding with custom status code and response body

```ts
badServer({ httpStatus: 401, response: "Invalid Credentials" });
```
