const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,  // Usa variables de entorno para seguridad
                    pass: process.env.EMAIL_PASS,  // Contraseña de la aplicación
                },
            });

            const mailOptions = {
                from: email,
                to: 'detododigital2023@gmail.com',  // Correo del destinatario
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
