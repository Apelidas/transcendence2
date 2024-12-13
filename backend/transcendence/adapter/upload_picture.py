from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication


class UploadProfilePictureView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    MAX_FILE_SIZE = 2 * 1024 * 1024  # 2MB

    def put(self, request):
        user = request.user
        file = request.FILES['file']
        if not file:
            return Response({'error': 'No image file provided'}, status=status.HTTP_400_BAD_REQUEST)
        if file.size > self.MAX_FILE_SIZE:
            return Response({f"File size should not exceed 2 MB"}, status=status.HTTP_400_BAD_REQUEST)

        if file.content_type not in self.ALLOWED_FILE_TYPES:
            return Response({"Unsupported file type. Allowed types are: JPEG, PNG, GIF, WebP."}, status=status.HTTP_400_BAD_REQUEST)

        user.profile_picture = file
        user.save()

        return Response({'message': 'Profile picture updated successfully'}, status=status.HTTP_200_OK)
