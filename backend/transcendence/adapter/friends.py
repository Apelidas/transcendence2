from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from transcendence.models import CustomUser
import logging

logger = logging.getLogger(__name__)

class FriendsView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            friendsInfo = user.getAllFriends()
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)

        print(friendsInfo)
        return JsonResponse(friendsInfo, status=200, safe=False)

    def post(self, request):
        try:
            user = request.user
            if not user or not user.is_authenticated:
                return JsonResponse({'message': 'could not authenticate User'}, status=403)
            data = request.data
            username = data.get('username')
            if not username:
                return JsonResponse({'message': 'missing username field'}, status=400)
            friendUser = CustomUser.objects.get_user_by_username(username=username)
            try:
                user.addFriend(friend=friendUser)
            except ValueError as ve:
                return JsonResponse({'message': str(ve)}, status=400)
            return Response(status=200)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)
