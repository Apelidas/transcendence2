
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication

class MfaDataView(APIView):
    authentication_classes = [JWTAuthentication]
    
    def post(self, request): 
        
        user = request.user
        
        return Response({
            'username': user.username,
            'secret': user.secret_2fa
        }, status=200)
    
    def put(self, request):

        data = json.loads(request.body)
        print(data.get('mfa_enabled'))
        mfa_enabled = data.get('mfa_enabled')
        if mfa_enabled is None:
            return JsonResponse({'error': 'Missing credentials'}, status=400)

        user = request.user
        user.mfa_enabled = mfa_enabled
        user.save()
        return JsonResponse({},status=200)
