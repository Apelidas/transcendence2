from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class UsernameView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        data = request.data
        newUsername = data.get('newUsername')
        print('newUsername: ' + newUsername) 
        try:
            user.update_username(newUsername)
        except ValueError as ve:
            return Response({'message': str(ve)}, status=400)  
        except Exception as e:
            return Response({'message': 'Unexpected error: ' + str(e)}, status=500)

        return Response(status=200)