const nodemailer = require('nodemailer')
require("dotenv").config()
const {SMTP_PASSWORD, SMTP_USER, API_URL, CLIENT_URL} = require("../config")
const User = require("../models/User");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: SMTP_USER,
            to,
            subject: "Активация аккаунта на " + API_URL,
            text: "",
            html: `<div>
<h1>Для активации аккаунта перейдите по ссылке</h1>
<a href="${link}">${link}</a>
</div>`
        })
    }

    async sendMessage(from, to, text) {
        await this.transporter.sendMail({
            from,
            to,
            subject: "Сообщение с сайта " + CLIENT_URL,
            text: "",
            html: `<div>
<h1>Пользователь ${from} отправил вам сообщение</h1>
<h3 >${text}</h3>
</div>`
        })
    }

    async activate(activationLink) {
        try {
            const user = await User.findOne({activationLink})
            if (!user) {

                throw new Error('Некорректная ссылка активации')
            }
            user.isActivated = true;
            await user.save();
        } catch (e) {
            console.log(e)

        }
    }
}

module.exports = new MailService()
