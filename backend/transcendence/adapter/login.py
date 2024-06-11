import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


@csrf_exempt
@require_POST
def login_view(request):
    data = json.loads(request.body)
    email = data['email']
    password = data['password']

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required.'}, status=400)

    user = authenticate(request, email=email, password=password)

    if user is not None:
        if user.is_active:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Account is inactive.'}, status=403)
    else:
        return JsonResponse({'error': 'Invalid email or password.'}, status=401)