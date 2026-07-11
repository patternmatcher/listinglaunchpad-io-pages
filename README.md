# Listing Launchpad

Canonical static deploy artifact for [listinglaunchpad.io](https://listinglaunchpad.io/).

The page has a safe GBP 335 / GBP 35 fallback, then loads checkout routing and current GBP pricing from the backend `/api/public-config` contract. Checkout always enters through `/start`; `/setup` is reserved for authenticated owner operations.

Run `npm test` before publishing. GitHub Actions verifies the public configuration contract, checkout route, pricing fallback, and required page elements.
