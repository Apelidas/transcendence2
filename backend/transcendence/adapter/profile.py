from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from transcendence.gameData import GameData
import logging
logger = logging.getLogger(__name__)

class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)

            profile_picture_url = (
                request.build_absolute_uri(user.profile_picture.url)
                if user.profile_picture else None
            )

            pvpData = getGameData(user=user, againstAi=False)
            aiData = getGameData(user=user, againstAi=True)


            profile_data = {
                'username': user.username,
                'email': user.email,
                'is_2fa_enabled': user.mfa_enabled,
                'profile_picture': profile_picture_url,
                'pvpData': pvpData,
                'aiData': aiData
            }
            return JsonResponse(profile_data, status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

    def put(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            new_password = data.get('newPassword')
            if not new_password:
                return JsonResponse({'message': 'Missing password field'}, status=400)
            user.set_password(new_password)
            user.save()
            return Response(status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

def getGameData(user, againstAi):
    wins = GameData.objects.getAllGamesWonBy(user, againstAi=againstAi).count()
    loses = GameData.objects.getAllGamesAgainst(user, againstAi=againstAi).count() - wins

    streak = GameData.objects.getMostWinsInARow(user, againstAi=againstAi)

    return {
        'wins': wins,
        'loses': loses,
        'streak': streak,
    }
