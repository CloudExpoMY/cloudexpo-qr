const express = require('express')
const serverless = require('serverless-http')
const QRCode = require('qrcode')

const app = express()

app.get('/.netlify/functions/generate-qr', async (req, res) => {
  const data = req.query.v

  if (!data) {
    return res.status(400).send('No data provided')
  }

  try {
    const options = {
      margin: 2,
      width: 300,
      height: 300,
    }

    const qrCodeDataURL = await QRCode.toDataURL(data, options)
    const imgBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': imgBuffer.length,
      'Content-Disposition': 'inline; filename="CloudExpo-QR.png"',
    })
    res.end(imgBuffer)
  } catch (err) {
    res.status(500).send('Error generating QR code')
  }
})

module.exports.handler = serverless(app)
