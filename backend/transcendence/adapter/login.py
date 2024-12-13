import pyotp
from django.contrib.auth import authenticate, login
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)


class LoginView(APIView):
    authentication_classes = []  # Disable JWT Authentication for this view

    def post(self, request):
        try:
            data = request.data
            username = data.get('username')
            password = data.get('password')

            if not username or not password:
                return Response({'error': 'username and password are required.'}, status=400)
            
            print('this is data: ' + str(data))
            user = authenticate(request, username=username, password=password)
            if user is not None:
                if user.is_active:
                    refresh = RefreshToken.for_user(user)
                    if user.mfa_enabled:
                        mfaCode = data.get('mfaCode')
                        if not mfaCode:
                            return Response({'message': '2FA AUTH required'}, status=401)
                        secret = user.secret_2fa
                        totp = pyotp.TOTP(secret)
                        if not totp.verify(mfaCode):
                            return Response({'message': '2FA Code not valid'}, status=401)
                    login(request, user)
                    return Response({
                        'message': 'Login successful',
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=200)
                else:
                    return Response({'error': 'Account is inactive.'}, status=403)
            else:
                return Response({'error': 'Invalid username or password.'}, status=401)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return Response({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
