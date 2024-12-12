import pyotp

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from datetime import timedelta, timezone
from django.utils.timezone import now


class CustomUserManager(BaseUserManager):
    def create_user(self, email, username, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def get_user_by_username(self, username):
        try:
            return self.get_queryset().get(username=username)
        except CustomUser.DoesNotExist:
            return None

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
    username = models.CharField(unique=True, max_length=25, default='aDefault')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    mfa_enabled = models.BooleanField(default=False)
    secret_2fa = models.CharField(default=pyotp.random_base32())
    lastAction = models.DateTimeField(null=True)
    friends = models.ManyToManyField('self', blank=True, symmetrical=True)
    profile_picture = models.ImageField(
        upload_to='pictures/',
        null=True,
        blank=True,
        default='pictures/shiroFood.webp'
    )

    def update_email(self, new_email):
        if not new_email:
            raise ValueError("The Email field must be set.")
        if CustomUser.objects.filter(email=new_email).exists():
            raise ValueError("This email is already in use.")
        self.email = new_email
        self.save()
        self.refresh_from_db()

    def updateLastAction(self):
        self.lastAction = now()
        self.save(update_fields=['lastAction'])

    def getAllFriends(self):
        friends = self.friends.all()

        friends_info = [
            {
                "username": friend.username,
                "status": True if friend.lastAction and timezone.now() - friend.lastAction < timedelta(
                    minutes=5) else False
            }
            for friend in friends
        ]

        return friends_info

    def addFriend(self, friend):
        if not isinstance(friend, CustomUser):
            raise ValueError("The provided friend must be an instance of CustomUser.")

        if friend == self:
            raise ValueError("You cannot add yourself as a friend.")

        if self.friends.filter(email=friend.email).exists():
            raise ValueError("You are already friends with this user.")

        # Add the friend to both users' friend lists
        self.friends.add(friend)
        friend.friends.add(self)
        self.save()
        friend.save()

    def getAllUsernames(self):
        return list(CustomUser.objects.exclude(username=self.username).values_list('username', flat=True))

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
