from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone
from transcendence.gameData import GameData
import logging
logger = logging.getLogger(__name__)

class TicTacToeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            leftScore = data.get('leftScore')
            rightScore = data.get('rightScore')
            leftPlayer = data.get('leftPlayer')
            rightPlayer = data.get('rightPlayer')
            againstAi = data.get('againstAi')
            isPong = data.get('isPong')
            userWon = data.get('userWon')
            if any(var is None for var in [leftScore, rightScore, againstAi, isPong, userWon, leftPlayer, rightPlayer]):
                return JsonResponse({'message': 'missing data'}, status=400)
            gameData = GameData(
                left_score=leftScore,
                right_score=rightScore,
                left_player=leftPlayer,
                right_player=rightPlayer,
                against_ai=againstAi,
                isPong=isPong,
                user_won=userWon,
                user=user,
                played_at=timezone.now())
            gameData.save()

            return Response(status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

    def get(self,request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            allGames = GameData.objects.getAllGamesPlayedBy(user=user, isPong=False)

            games_data = [
                {
                    'id': game.id,
                    'left_score': game.left_score,
                    'right_score': game.right_score,
                    'left_player': game.left_player,
                    'right_player': game.right_player,
                    'against_ai': game.against_ai,
                    'played_at': game.played_at.isoformat(),  # Ensure datetime is in a JSON-friendly format
                    'user': game.user.username,  # Serialize the user's username
                    'user_won': game.user_won,
                    'isPong': game.isPong
                }
                for game in allGames
            ]
            return JsonResponse(games_data, status=200, safe=False)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
