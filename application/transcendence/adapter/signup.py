import json
import random
import string

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from transcendence.models import CustomUser


@csrf_exempt
def signup_view(request):
    if request.method != "POST":
        return JsonResponse({'error': request.method}, status=409)
    data = json.loads(request.body)
    email = data['email']
    password = data['password']
    if not email or not password:
        return JsonResponse({'error': 'Missing credentials'}, status=409)
    user = CustomUser.objects.create_user(randomName(), email, password)
    if user is None:
        return JsonResponse({'error': 'something'}, status=409)
    user.save()
    return JsonResponse({'message': 'Hello World'}, status=200)


def randomName():
    return 'user' + ''.join(random.choices(string.digits, k=6))
