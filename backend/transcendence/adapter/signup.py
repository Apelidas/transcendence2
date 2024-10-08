import json
import pyotp
import time

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

from transcendence.models import CustomUser


class SignUpView(APIView):
    authentication_classes = []

    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return JsonResponse({'error': 'Missing credentials'}, status=400)
        if CustomUser.objects.user_exists(email) is True:
            return JsonResponse({'error': 'User exists already'}, status=409)
        secret = pyotp.random_base32()
        user = create_custom_user(email, password, secret)
        if user is None:
            return JsonResponse({'error': 'something went wrong'}, status=409)
        user.save()
        return JsonResponse({'message': 'Sign Up successful'}, status=200)


def create_custom_user(email, password, secret):
    user = CustomUser(
        email=email,
        secret=secret,
    )
    user.set_password(password)  # This will hash the password before saving
    return user
