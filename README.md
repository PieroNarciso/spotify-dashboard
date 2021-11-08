# DiscoverFy

Discover new music based in your taste.

<div style="display: flex;">
  <img src="https://i.imgur.com/FyWvyNL.png" alt="First screen on login" height="400" />
  <img src="https://i.imgur.com/kdyDvPY.png" alt="Second screen when closing modal" height="400" />
</div>

## Features
### Themes

Light, Dark, Retro themes aviable.

<div style="display: flex;">
  <img src="https://i.imgur.com/7h2GLec.png" alt="Light Theme" height="400" />
  <img src="https://i.imgur.com/61lvgNs.png" alt="Dark Theme" height="400"/>
  <img src="https://i.imgur.com/lO83muk.png" alt="Retro Theme" height="400" />
</div>

### Volume Control
<img src="https://i.imgur.com/xupTwWs.png" alt="Volume Control" height="400" />

## Local Development

Install dependencies with `yarn`
```bash
$ yarn
```
Create a `.env` file in the root directory of the project and copy the content of `env-sample`; then modify the
environment variables to match your client ID and redirect url for spotify API to work.
```bash
$ cp env-sample .env
```
Run the development server
```bash
$ yarn dev
```
