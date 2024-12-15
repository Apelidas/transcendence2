import json
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
logger = logging.getLogger(__name__)

class MfaDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = request.user

            return JsonResponse({
                'username': user.username,
                'secret': user.secret_2fa
            }, status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

    def put(self, request):
        try:
            data = json.loads(request.body)
            print(data.get('mfa_enabled'))
            mfa_enabled = data.get('mfa_enabled')
            if mfa_enabled is None:
                return JsonResponse({'error': 'Missing credentials'}, status=400)

            user = request.user
            user.mfa_enabled = mfa_enabled
            user.save()
            return JsonResponse({}, status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
