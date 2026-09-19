import os

from aiosmtplib import SMTP
from email.message import EmailMessage


async def send_verification_email(
    recipient_email: str,
    verification_code: str
):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD")

    message = EmailMessage()

    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = "STUD-Heal Email Verification"

    message.set_content(
        f"""
Hello,

Welcome to STUD-Heal!

Your email verification code is:

{verification_code}

This code will expire in 10 minutes.

If you did not create a STUD-Heal account, you can ignore this email.

Regards,
STUD-Heal Team
"""
    )

    smtp = SMTP(
        hostname="smtp.gmail.com",
        port=587,
        start_tls=True
    )

    await smtp.connect()

    await smtp.login(
        sender_email,
        sender_password
    )

    await smtp.send_message(message)

    await smtp.quit()