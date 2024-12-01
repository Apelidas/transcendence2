from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication


class ImageView(APIView):
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        if 'image' not in request.FILES:
            return Response({'error': 'No image provided'}, status=400)

        image = request.FILES['image']
        file_name = default_storage.save(os.path.join('media', image.name), ContentFile(image.read()))

        return Response({'message': 'Image uploaded successfully', 'file_path': file_name}, status=201)
