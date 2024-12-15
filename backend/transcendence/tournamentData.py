from django.db import models
from django.conf import settings
from django.utils import timezone



class TournamentManager(models.Manager):
    def getByUser(self, user):
        return self.model.objects.filter(user=user)
    
    def createTournament(self, isPong, participants, user):
        tournament = self.create(
            isPong=isPong,
            participants=participants,
            user=user,
            started_at=timezone.now(),
        )
        return tournament
    
    def finishTournament(self, winner, id):
        try:
            tournament = self.get(id=id)
            if not isinstance(winner, str):
                raise ValueError("Winner must be a string.")
            tournament.winner = winner
            tournament.finished_at = timezone.now()
            tournament.save()
            return tournament
        except TournamentData.DoesNotExist:
            raise ValueError(f"Tournament with ID {id} does not exist.")



class TournamentData(models.Model):
    id = models.AutoField(primary_key=True)
    started_at = models.DateTimeField(default=timezone.now)
    finished_at = models.DateTimeField(null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    isPong = models.BooleanField()
    participants = models.JSONField(default=list)
    wonBy = models.CharField(max_length=25, null=True)

    objects = TournamentManager()

    def __str__(self):
        return str(self.id)
    
    
