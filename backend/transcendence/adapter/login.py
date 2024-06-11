from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate
from django.views.decorators.csrf import csrf_exempt
import json

from transcendence.adapter.util import checkForCredentials


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        email, password = checkForCredentials()
        if not email or not password:
            return JsonResponse({'error': 'missing credentials'}, status=400)
        try:
            user = authenticate(request, email=email, password=password)
        except Exception as e:
            print(e)
            return JsonResponse(e, status=401)
        if user is not None:
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def findUser(email, password):
    User = get_user_model()
    try:
        user = User.objects.get(email=email)
        if user.check_password(password):
            return user
    except User.DoesNotExist:
        return None

