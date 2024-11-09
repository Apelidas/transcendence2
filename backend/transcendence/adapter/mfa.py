
import json

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication

class MfaDataView(APIView):
    authentication_classes = [JWTAuthentication]
    
    def post(self, request): 
        
        user = request.user
        print("Post-Request received!")
        
        
        return Response({
            'message': 'Mfa data',
            'username': user.username,
            'secret': user.secret_2fa
        }, status=200)
