from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class ChangeEmailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        print("Authenticated User:", request.user)
        print("Is Authenticated:", request.user.is_authenticated)
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        data = request.data
        new_email = data.get('newEmail')
        try:
            user.update_email(new_email)
        except ValueError as ve:
            return Response({'message': str(ve)}, status=400)  # Specific for value errors
        except Exception as e:
            return Response({'message': 'Unexpected error: ' + str(e)}, status=500)

        return Response(status=200)