
import json

from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import CustomUser
from rest_framework.permissions import IsAuthenticated

class MfaDataView(APIView):
    authentication_classes = []  # Disable JWT Authentication for this view
    
    def post(self, request): 
        
        # TODO get user info from request data (username)
        # user = request.user
        # data = user.getMfaData()
        # print("data" + data)
        print("Post-Request received!")
        
        
        return Response({
            'message': 'Mfa data',
            'username': "dummy", # data.username
            'secret': "geheim", # data.secret
        }, status=200)
