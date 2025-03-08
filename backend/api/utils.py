import random
from twilio.rest import Client
from django.conf import settings

def send_otp(mobile):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    otp = str(random.randint(100000, 999999))  #  Generate a 6-digit OTP

    try:
        message = client.messages.create(
            body=f"Your OTP is {otp}",
            from_=settings.TWILIO_PHONE_NUMBER,
            to=f"+91{mobile}"  #  Format mobile number properly
        )

        print(f"OTP Sent: {otp} to {mobile} (Message SID: {message.sid})")  #  Debugging log
        return otp  #  Return OTP if sent successfully

    except Exception as e:
        print(f"Twilio Error: {e}")  #  Debugging log for Twilio errors
        return None  #  OTP sending failed
