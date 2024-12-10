from django.db import models
from django.conf import settings


class GameDataManager(models.Manager):
    def getAllGamesWonBy(self, user, againstAi):
        return self.filter(user=user, user_won=True, against_ai=againstAi)

    def getAllGamesPlayedBy(self, user, againstAi):
        return self.filter(user=user, against_ai=againstAi)

    def getMostWinsInARow(self, user, againstAi):
        games = self.filter(user=user, against_ai=againstAi).order_by('played_at')
        max_streak = 0
        current_streak = 0

        for game in games:
            if game.user_won:
                current_streak += 1
                max_streak = max(max_streak, current_streak)
            else:
                current_streak = 0

        return max_streak


class GameData(models.Model):
    id = models.AutoField(primary_key=True)
    left_score = models.IntegerField()
    right_score = models.IntegerField()
    against_ai = models.BooleanField()
    played_at = models.DateTimeField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    user_won = models.BooleanField()

    objects = GameDataManager()

    def __str__(self):
        return f"Game {self.id}: {self.user} {'won' if self.user_won else 'lost'} on {self.played_at}"
