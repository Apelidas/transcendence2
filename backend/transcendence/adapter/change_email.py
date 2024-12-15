from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import JsonResponse
import logging
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class ChangeEmailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            user = request.user
            print("Authenticated User:", request.user)
            print("Is Authenticated:", request.user.is_authenticated)
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            new_email = data.get('newEmail')
            try:
                user.update_email(new_email)
            except ValueError as ve:
                return JsonResponse({'message': str(ve)}, status=400)  # Specific for value errors
            except Exception as e:
                return JsonResponse({'message': 'Unexpected error: ' + str(e)}, status=500)

            return Response(status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)