from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.db.models import Count, Case, When, IntegerField
from django.db.models.functions import TruncDate
from transcendence.gameData import GameData
from django.db.models import Count
import logging

logger = logging.getLogger(__name__)

class GraphView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            return JsonResponse(list(self.get_wins_per_day(user)), status=200, safe=False)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

    @staticmethod
    def get_wins_per_day(user):

        results = (
            GameData.objects.filter(user=user)
            .annotate(date=TruncDate('played_at'))  # Extract date from `played_at`
            .values('date')  # Group by date
            .annotate(
                win_count=Count(
                    Case(
                        When(user_won=True, then=1),
                        output_field=IntegerField(),
                    )
                ),  # Count the number of wins
                lose_count=Count(
                    Case(
                        When(user_won=False, then=1),
                        output_field=IntegerField(),
                    )
                ),  # Count the number of losses
            )
            .order_by('date')  # Order by date
        )

        return results