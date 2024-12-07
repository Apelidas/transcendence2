from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)

        profile_picture_url = (
            request.build_absolute_uri(user.profile_picture.url)
            if user.profile_picture else None
        )

        profile_data = {
            'username': user.username,
            'email': user.email,
            'is_2fa_enabled': user.mfa_enabled,
            'profile_picture': profile_picture_url
        }
        return Response(profile_data, status=200)

    def put(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        data = request.data
        new_password = data.get('newPassword')
        user.set_password(new_password)
        user.save()
        return Response(status=200)
