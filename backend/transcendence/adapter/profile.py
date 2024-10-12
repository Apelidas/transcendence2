from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
