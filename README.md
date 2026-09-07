# PesaFlow Dashboard

A React + TypeScript web client for [PesaFlow](https://github.com/martyns254/PesaFlow), my Spring Boot payment/wallet microservices project. Built as a separate repo on purpose, it talks to PesaFlow's REST APIs over HTTP the same way any external client would, not by sharing code.

Built to get real, hands-on React and TypeScript experience on top of a backend I already understood deeply, rather than starting a frontend project from a blank, unfamiliar domain.

## What it does

- Looks up a wallet's balance by phone number
- Lists recent payments and their status (`PENDING`, `SUCCESS`, `FAILED`)
- Calls `payment-service` (port 8080) and `wallet-service` (port 8081) directly, each secured with the same `X-API-KEY` header used everywhere else in PesaFlow

## Design

Built with a ledger aesthetic rather than a generic admin-dashboard template: ink navy background, a single gold accent, Instrument Serif for the balance figure, Inter for everything else, right-aligned amounts (standard accounting convention), and quiet status dots instead of loud badge pills.

## A few real decisions and bugs behind it

- CORS had to be configured on both backend services, plus an exception in the custom `ApiKeyFilter` for `OPTIONS` preflight requests, since the browser can't attach a custom header to those
- A failed wallet lookup (404) was originally read as if it succeeded, storing `undefined` into state and crashing the whole page the moment `.toLocaleString()` ran on it. Fixed by checking `response.ok` before parsing, and by checking `typeof value === 'number'` before formatting anywhere a number is displayed, rather than only checking against `null`
- Errors are shown in the interface itself ("No wallet found for this number") instead of letting the page crash or fail silently

## Running locally

Requires `payment-service` and `wallet-service` from PesaFlow running locally first (ports 8080 and 8081).

```
npm install
npm run dev
```

## Stack

React, TypeScript, Vite

## Author

Martins Kosgei — [github.com/martyns254](https://github.com/martyns254)
