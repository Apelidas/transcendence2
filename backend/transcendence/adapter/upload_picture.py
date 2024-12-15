from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
import logging
logger = logging.getLogger(__name__)

class UploadProfilePictureView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    MAX_FILE_SIZE = 2 * 1024 * 1024  # 2MB

    def put(self, request):
        try:
            user = request.user
            file = request.FILES['file']
            if not file:
                return JsonResponse({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
            if file.size > self.MAX_FILE_SIZE:
                return JsonResponse({f"File size should not exceed 2 MB"}, status=status.HTTP_400_BAD_REQUEST)

            if file.content_type not in self.ALLOWED_FILE_TYPES:
                return JsonResponse({"Unsupported file type. Allowed types are: JPEG, PNG, GIF, WebP."}, status=status.HTTP_400_BAD_REQUEST)

            user.profile_picture = file
            user.save()

            return JsonResponse({'message': 'Profile picture updated successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}", exc_info=True)
            return JsonResponse({'error': 'An unexpected error occurred. Please try again later.'}, status=500)