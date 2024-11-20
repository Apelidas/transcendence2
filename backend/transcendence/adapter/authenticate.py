import pyotp
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken


class AuthenticationView(APIView):
    authentication_classes = []

    def post(self, request):
        data = request.data
        temporaryToken = data.get('temporaryToken')
        mfaCode = data.get('mfaCode')
        sessionToken = request.session['temporaryToken']
        userId = request.session['userId']

        if not temporaryToken or not mfaCode:
            return Response({'error': 'missing information'}, status=401)
        if not sessionToken or not userId:
            return Response({'error': 'Session timed out'}, status=401)
        if not sessionToken == temporaryToken:
            return Response({'error': 'invalid Credentials'}, status=401)
        user = User.objects.get(id= userId)

        if not user:
            return Response({'error': 'invalid User'}, status=401)
        secret = user.secret_2fa
        totp = pyotp.TOTP(secret)
        if totp.verify(mfaCode):
            login(request, user)
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=200)
        return Response({'error': 'Invalid 2FA Code'}, status=200)

