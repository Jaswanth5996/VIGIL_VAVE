from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, username, mobile, password=None, **extra_fields):
        if not mobile:
            raise ValueError("The Mobile Number field is required")
        if not username:
            raise ValueError("The Username field is required")

        # ✅ Assign the mobile number as the username if it's missing
        user = self.model(username=username, mobile=mobile, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, mobile, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(username, mobile, password, **extra_fields)

class CustomUser(AbstractUser):
    mobile = models.CharField(max_length=10, unique=True)
    otp = models.CharField(max_length=6, blank=True, null=True)

    USERNAME_FIELD = "username"  # ✅ Keep username required
    REQUIRED_FIELDS = ["mobile"]  # ✅ Ensure mobile is also required

    objects = CustomUserManager()

    def save(self, *args, **kwargs):
        # ✅ Automatically set username to mobile if it's not set
        if not self.username:
            self.username = self.mobile
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.mobile})"  # ✅ Show both username & mobile



class Details(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact1 = models.CharField(max_length=10, blank=False)
    contact2 = models.CharField(max_length=10, blank=False)
    contact3 = models.CharField(max_length=10, blank=False)
    secret_code = models.CharField(max_length=10, blank=False)

    def __str__(self):
        return self.user.mobile
