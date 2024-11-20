import json

from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class LoginView(APIView):
    authentication_classes = []  # Disable JWT Authentication for this view

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return Response({'error': 'Email and password are required.'}, status=400)

        user = authenticate(request, email=email, password=password)

        if user is not None:
            if user.is_active:
                refresh = RefreshToken.for_user(user)
                if user.mfa_enabled:
                    tempToken = str(refresh.access_token)
                    request.session['temporaryToken'] = tempToken
                    request.session['userId'] = user.id
                    request.session.set_expiry(600)
                    return Response({
                        'message': '2FA AUTH required',
                        'temporaryToken': tempToken
                    }, status=401)
                login(request, user)
                return Response({
                    'message': 'Login successful',
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }, status=200)
            else:
                return Response({'error': 'Account is inactive.'}, status=403)
        else:
            return Response({'error': 'Invalid email or password.'}, status=401)
