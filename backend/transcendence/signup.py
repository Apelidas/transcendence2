import json

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
        return JsonResponse({'error': 'Missing credentials'}, status=400)
    if CustomUser.objects.user_exists(email) is True:
        return JsonResponse({'error': 'User exists already'}, status=409)
    user = create_custom_user(email, password)
    if user is None:
        return JsonResponse({'error': 'something'}, status=409)
    user.save()
    return JsonResponse({'message': 'Hello World'}, status=200)


def create_custom_user(email, password):
    user = CustomUser(
        email=email,
    )
    user.set_password(password)  # This will hash the password before saving
    return user
