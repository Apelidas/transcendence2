import json

from django.http import JsonResponse
from rest_framework.views import APIView

from transcendence.models import CustomUser


class SignUpView(APIView):
    authentication_classes = []

    def post(self, request):
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        username = data.get('username')
        print('this is data: ' + str(data))
        print('EMAIL: ' + email)
        print('PASSWORD: ' + password)
        if not email or not password or not username:
            return JsonResponse({'error': 'Missing credentials'}, status=400)
        if CustomUser.objects.user_exists(email) is True:
            return JsonResponse({'error': 'Email exists already'}, status=409)
        if CustomUser.objects.username_exists(username) is True:
            return JsonResponse({'error': 'username exists already'}, status=409)
        user = create_custom_user(email, username, password)
        if user is None:
            return JsonResponse({'error': 'something went wrong'}, status=409)
        user.save()
        return JsonResponse({'message': 'Sign Up successful'}, status=200)


def create_custom_user(email, username, password):
    return CustomUser.objects.create_user(email=email, username=username, password=password)
