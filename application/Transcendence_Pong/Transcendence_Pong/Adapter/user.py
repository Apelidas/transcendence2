from django.db import models


class User(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    class Meta:
        managed = False
        db_table = 'users'
