
import json

from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser

class MfaDataView(APIView):
    
    def get(self, request): 
        
        data = CustomUser.getMfaData()
        
        return Response({
            'message': 'Mfa data',
            'username': data.username,
            'secret': data.secret,
        }, status=200)
