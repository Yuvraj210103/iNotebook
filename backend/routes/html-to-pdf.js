const express = require('express');
const app = express();
const pdf = require('html-pdf-chrome');

app.use(express.json());

app.post('/generate-pdf', async (req, res) => {
    try {
      const options = {
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      };
      const pdfBuffer = await pdf().from(req.body.html).withOptions(options).toBuffer();
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=filename.pdf',
        'Content-Length': pdfBuffer.length,
      });
      res.send(pdfBuffer);
    } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
    }
  });