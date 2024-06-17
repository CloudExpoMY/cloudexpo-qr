## CloudExpo QR Generator

Turn any string into a 8-bit QR code (supported by Meta Cloud-API).

Simply visit https://qr.cloudexpo.my?v=helloworld to get the QR image.

This is written for Netlify serverless functions.

### To run locally

1. `npm install`
1. `npm i -g netlify-cli`
1. `netlify functions:serve`
1. Visit `http://localhost:9999/.netlify/functions/qr?v=YOUR_QR_STRING`


In `netlify.toml`, we redirect `/*` to `/.netlify/functions/qr`.

This way, visiting `domain.com?v=1` is equivalent of `localhost:9999/.netlify/functions/qr?v=1`.