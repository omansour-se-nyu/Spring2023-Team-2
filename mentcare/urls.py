"""mentcare URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.documentation import include_docs_urls
from rest_framework.simplejwt import views as jwt_views

from mentcarebackend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", views.ListMentcareAPIView.as_view(), name="Mentcare_list"),
    path("create/", views.CreateMentcareAPIView.as_view(), name="Mentcare_create"),
    path("update/<int:pk>/", views.UpdateMentcareAPIView.as_view(), name="update_Mentcare"),
    path("delete/<int:pk>/", views.DeleteMentcareAPIView.as_view(), name="delete_Mentcare"),
    path('docs/', include_docs_urls(title='Mentcare Api')),
    path('api/token', obtain_auth_token, name="auth_token"),
    path('api/jwt/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/jwt/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
