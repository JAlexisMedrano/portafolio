const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');  // Permitir todas las solicitudes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');  // Encabezados permitidos

    // Si la solicitud es OPTIONS (preflight), responde con un 200 OK
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: email,
                to: 'detododigital2023@gmail.com',
                subject: `Contact Form: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};
