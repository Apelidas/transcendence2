from django.http import JsonResponse
from Transcendence_Pong.Transcendence_Pong.Adapter.user import User


def my_endpoint(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = User.objects.get(email=email, password=password)
            return JsonResponse({'message': 'User authenticated successfully.'})
        except User.DoesNotExist:
            return JsonResponse({'message': 'Invalid email or password.'}, status=401)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed.'}, status=405)
