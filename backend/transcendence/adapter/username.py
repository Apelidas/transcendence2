from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
from rest_framework.response import Response
logger = logging.getLogger(__name__)

class UsernameView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            newUsername = data.get('newUsername')
            print('newUsername: ' + newUsername) 
            try:
                user.update_username(newUsername)
            except ValueError as ve:
                return JsonResponse({'message': str(ve)}, status=400)  
            except Exception as e:
                return JsonResponse({'message': 'Unexpected error: ' + str(e)}, status=500)

            return Response(status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)