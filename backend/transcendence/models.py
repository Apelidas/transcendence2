import pyotp

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.secret_2fa = pyotp.random_base32()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

    def user_exists(self, email):
        return self.model.objects.filter(email=email).exists()

    def username_exists(self, username):
        return self.model.objects.filter(username=username).exists()


class CustomUser(AbstractBaseUser):
    objects = CustomUserManager()
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=25, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    mfa_enabled = models.BooleanField(default=False)
    secret_2fa = models.CharField(default=False) # default=pyotp.random_base32()

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    def getMfaData(self):
        data = MfaData(self.email, self.secret_2fa)
        return data

class MfaData:
  def __init__(self, username, secret):
    self.username = username
    self.secret = secret
