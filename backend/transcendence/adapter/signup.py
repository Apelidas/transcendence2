import json
import re

from django.http import JsonResponse
from rest_framework.views import APIView

from transcendence.models import CustomUser
import logging
logger = logging.getLogger(__name__)

class SignUpView(APIView):
    authentication_classes = []

    def post(self, request):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            username = data.get('username')
            print('this is data: ' + str(data))
            print('EMAIL: ' + email)
            print('PASSWORD: ' + password)
            if not email or not password or not username:
                return JsonResponse({'error': 'Missing credentials'}, status=400)
            if not password_is_correct(password):
                return JsonResponse({'error': 'Password does not meet the criteria!'}, status=400)
            if CustomUser.objects.user_exists(email) is True:
                return JsonResponse({'error': 'Email exists already'}, status=409)
            if CustomUser.objects.username_exists(username) is True:
                return JsonResponse({'error': 'username exists already'}, status=409)
            user = create_custom_user(email, username, password)
            if user is None:
                return JsonResponse({'error': 'something went wrong'}, status=409)
            user.save()
            return JsonResponse({'message': 'Sign Up successful'}, status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

def create_custom_user(email, username, password):
    return CustomUser.objects.create_user(email=email, username=username, password=password)

def password_is_correct(password) -> bool:
    if len(password) < 8:
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"\d", password):
        return False
    if not re.search(r"[!@#$%^&*]", password):
        return False
    return True
