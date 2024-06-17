const express = require('express')
const serverless = require('serverless-http')
const QRCode = require('qrcode')

const app = express()

app.get('/api/qr', async (req, res) => {
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

    console.log('Generating QR code...')
    const qrCodeDataURL = await QRCode.toDataURL(data, options)
    const imgBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')

    console.log('QR code generated, sending response...')
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': imgBuffer.length,
      'Content-Disposition': 'inline; filename="CloudExpo-QR.png"',
    })
    res.end(imgBuffer)
  } catch (err) {
    console.error('Error generating QR code:', err)
    res.status(500).send('Error generating QR code')
  }
})

module.exports.handler = serverless(app)
