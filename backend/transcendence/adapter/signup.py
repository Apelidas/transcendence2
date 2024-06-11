from django.http import JsonResponse
import json

from transcendence.adapter.util import checkForCredentials
from transcendence.models.user import User


def signup_view(request):
    if request.method == 'POST':
        email, password = checkForCredentials()
        if not email or not password:
            return JsonResponse({'error': 'missing credentials' }, status=400)
        try:
            User.objects.create_user(email, password)
            return JsonResponse({'status': 'success', 'message': 'Account created successfully.'}, status=201)
        except Exception as e:
            return JsonResponse({'error': 'User already exists'}, status=409)
    return JsonResponse({'error': 'Invalid request method'}, status=405)
