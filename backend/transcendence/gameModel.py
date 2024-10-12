from django.db import models
from django.conf import settings
from django.utils import timezone

class Game(models.Model):
    # Unique game ID
    id = models.AutoField(primary_key=True)

    # Game type, with options 'pong' or 'tic tac toe'
    PONG = 'pong'
    TIC_TAC_TOE = 'tic_tac_toe'
    GAME_TYPE_CHOICES = [
        (PONG, 'Pong'),
        (TIC_TAC_TOE, 'Tic Tac Toe')
    ]
    gametype = models.CharField(max_length=15, choices=GAME_TYPE_CHOICES)

    # End score, stored as a string like '9:5'
    endscore = models.CharField(max_length=5)

    user_won = models.BooleanField()

    against_ai = models.BooleanField()

    # Date and time the game was played, default to current datetime
    played_at = models.DateTimeField(default=timezone.now)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f'Game {self.id} - {self.gametype}'

    class Meta:
        # Optionally you can add more metadata options, like ordering by `played_at`
        ordering = ['-played_at']