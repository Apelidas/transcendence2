from django.db import models


class CustomUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    password = models.TextField(max_length=256)