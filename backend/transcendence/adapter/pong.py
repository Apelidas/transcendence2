from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils import timezone
from transcendence.gameData import GameData


class PongView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        data = request.data
        leftScore = data.get('leftScore')
        rightScore = data.get('rightScore')
        againstAi = data.get('againstAi')
        isPong = data.get('isPong')
        userWon = data.get('userWon')
        if any(var is None for var in [leftScore, rightScore, againstAi, isPong, userWon]):
            return Response({'message': 'missing data'}, status=400)
        gameData = GameData(
            left_score=leftScore,
            right_score=rightScore,
            against_ai=againstAi,
            isPong=isPong,
            user_won=userWon,
            user=user,
            played_at=timezone.now())
        gameData.save()

        return Response(status=200)

