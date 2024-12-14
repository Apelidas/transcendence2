from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models.functions import TruncDate
from transcendence.gameData import GameData
from django.db.models import Count



class GraphView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        return Response(self.get_wins_per_day(user), 200)


    @staticmethod
    def get_wins_per_day(user):

        results = (
            GameData.objects.filter(user=user)
            .annotate(date=TruncDate('played_at'))  # Extract date from `played_at`
            .values('date')  # Group by date
            .annotate(win_count=Count('id'))  # Count the number of wins per day
            .order_by('date')  # Order by date # Sort by date
        )

        return results