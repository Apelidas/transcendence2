"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from transcendence.adapter.friends import FriendsView
from transcendence.adapter.pong import PongView
from transcendence.adapter.profile import ProfileView
from transcendence.adapter.signup import SignUpView
from transcendence.adapter.login import LoginView
from transcendence.adapter.mfa import MfaDataView
from transcendence.adapter.change_email import ChangeEmailView
from transcendence.adapter.upload_picture import UploadProfilePictureView
from django.conf import settings
from django.conf.urls.static import static

from transcendence.adapter.users import UsersView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/', SignUpView.as_view(), name='signup_view'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name='login_view'),
    path('profile/', ProfileView.as_view(), name='profile_view'),
    path('mfa_data/', MfaDataView.as_view(), name='mfa_view'),
    path('profile/upload-picture', UploadProfilePictureView.as_view(), name='upload_picture_view'),
    path('profile/change-email', ChangeEmailView.as_view(), name='upload_picture_view'),
    path('pong/', PongView.as_view(), name='pong_view'),
    path('friends/', FriendsView.as_view(), name='friends_view'),
    path('users/', UsersView.as_view(), name='friends_view'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
