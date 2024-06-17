const QRCode = require('qrcode')

const handler = async (event, context) => {
  const { path, rawQuery } = event

  // Handle favicon.ico request
  if (path === '/favicon.ico') {
    return {
      statusCode: 204,
      headers: {
        'Content-Type': 'image/x-icon',
      },
      body: null,
    }
  }

  const params = new URLSearchParams(rawQuery)
  const data = params.get('v')
  const size = params.get('size') ? parseInt(params.get('size')) : 300 // Default to 300 if no size is provided

  if (!data) {
    return { statusCode: 400, body: 'No data provided' }
  }

  try {
    const options = {
      margin: 2,
      width: size,
      height: size,
    }

    const qrCodeDataURL = await QRCode.toDataURL(data, options)
    const imgBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64')

    console.info(`QR code generated - ${data}`)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="CloudExpo-QR.png"',
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
      body: imgBuffer.toString('base64'),
      isBase64Encoded: true,
    }
  } catch (err) {
    console.error('Error generating QR code:', err)
    return { statusCode: 500, body: 'Error generating QR code' }
  }
}

module.exports = { handler }
