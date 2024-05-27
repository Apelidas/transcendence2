from django.http import JsonResponse
from django.contrib.auth import authenticate

def loginView(request):
    return JsonResponse({'message': 'hello world'})
    # if request.method == 'POST':
    #     username = request.POST.get('username')
    #     password = request.POST.get('password')
    #     user = authenticate(request, username=username, password=password)
    #     if user:
    #         # Authentication successful
    #         return JsonResponse({'message': 'Login successful'})
    #     else:
    #         # Authentication failed
    #         return JsonResponse({'error': 'Invalid credentials'}, status=400)
    # else:
    #     # Method not allowed
    #     return JsonResponse({'error': 'Method not allowed'}, status=405)
