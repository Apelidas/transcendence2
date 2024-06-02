from django.http import JsonResponse
from django.contrib.auth import get_user_model, authenticate
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({'error': 'Invalid data'}, status=400)
        if password is None:
            return JsonResponse({'status': 'error', 'message': 'Password is required.'})

        if email is None:
            return JsonResponse({'status': 'error', 'message': 'Email is required'})
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

