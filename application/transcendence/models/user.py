from django.db import models

class UserManager(models.Manager):
    def get_user_by_email(self, email):
        return self.get(email=email)

    def create_user(self, email, password):
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user