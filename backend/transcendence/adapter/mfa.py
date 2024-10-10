
import json

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser
from rest_framework.permissions import IsAuthenticated

class MfaDataView(APIView):
    authentication_classes = []  # Disable JWT Authentication for this view
    
    def get(self, request): 
        
        data = CustomUser.getMfaData()
        print(data)
        
        return Response({
            'message': 'Mfa data',
            'username': data.username,
            'secret': data.secret,
        }, status=200)
