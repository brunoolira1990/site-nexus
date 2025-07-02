import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export const sendContactEmail = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;

  // Configure o transporter com os dados do seu servidor de e-mail
  const transporter = nodemailer.createTransport({
    host: 'nexusvalvulas.com.br', // Altere para o host do seu servidor
    port: 465, // Ou 587, conforme seu provedor
    secure: true, // true para 465, false para 587
    auth: {
      user: 'site@nexusvalvulas.com.br', // Altere para seu e-mail
      pass: 'Nexus@Site' // Altere para sua senha
    }
  });

  try {
    await transporter.sendMail({
      from: 'site@nexusvalvulas.com.br', // Altere para seu e-mail
      to: 'nexus@nexusvalvulas.com.br', // Altere para o destinatário
      subject: 'Novo contato do site Nexus',
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`,
      replyTo: email
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao enviar e-mail' });
  }
}; 