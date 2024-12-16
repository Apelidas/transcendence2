from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
import logging
from transcendence.tournamentData import TournamentData
logger = logging.getLogger(__name__)

class TournamentView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            isPong = data.get('isPong')
            participants = data.get('participants')
            if not isPong or not participants:
                return JsonResponse({'error': 'Missing Data'}, status=400)
            if not len(participants) == 4:
                return JsonResponse({'error': 'Not right amount of participants'}, status=400)
            tournament = TournamentData.objects.createTournament(isPong, participants, user)
            if tournament is None:
                return JsonResponse({'error': 'something went wrong'}, status=409)
            tournament.save()
            return JsonResponse({'id': tournament.id}, status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
        

    def put(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            id = data.get('id')
            winner = data.get('winner')
            if not id or not winner:
                return JsonResponse({'error': 'Missing Data'}, status=400)
            TournamentData.objects.finishTournament(winner, id)
            return Response(status=200)
        except ValueError as ve:
                return JsonResponse({'message': str(ve)}, status=400)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
