# bad-server

An express middleware that will ruin your express server's performance.

## Why would you want this?

Developers often forget to account for API errors when building applications. Sometimes there might be networksissues, sometimes the server might be unreachable for some reason. This libary will help you build applications that are resilient to such situations by forcing you to handle them in development.

## Installation

`npm install bad-server`

## Usage

```ts
import { badServer } from "bad-server";

// or

const { badServer } = require("bad-server");
```

```ts
app.use(badServer({ delay: 2000 }));

router.get(
  "/api",
  badServer({ maxDelay: 3000, failRate: 0.1 }),
  (req, res, next) => res.send("Hello World")
);
```

## Options

| Option   | Description                                                                                |
| -------- | ------------------------------------------------------------------------------------------ |
| delay    | Fixed amount of delay for the response in milliseconds, takes precedence over `maxDelay`   |
| maxDelay | Variant amount of delay for the response in milliseconds                                   |
| failRate | A number between 0 and 1 expressing the likelyhood of rejecting a request with a 500 error |
