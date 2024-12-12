from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from transcendence.models import CustomUser


class FriendsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        friendsInfo = user.getAllFriends()

        print(friendsInfo)
        return Response(friendsInfo, status=200)

    def post(self, request):
        user = request.user
        if not user or not user.is_authenticated:
            return Response({'message': 'could not authenticate User'}, status=403)
        data = request.data
        username = data.get('username')
        if not username:
            return Response({'message': 'missing username field'}, status=400)
        friendUser = CustomUser.objects.get_user_by_username(username=username)
        try:
            user.addFriend(friend=friendUser)
        except ValueError as ve:
            return Response({'message': str(ve)}, status=400)
        return Response(status=200)

