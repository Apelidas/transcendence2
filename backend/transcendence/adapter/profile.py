from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        profile_data = {
            'username': user.username,
            'email': user.email,
            'is_2fa_enabled': user.mfa_enabled,
        }
        return Response(profile_data, status=200)
