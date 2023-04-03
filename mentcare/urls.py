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
from rest_framework.documentation import include_docs_urls

from mentcarebackend import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', views.login_view, name="Login Page"),
    path('account/register/', views.register_user, name="Registration Page"),
    path('staff/patients/records/create/', views.create_patient_records, name="Create Patient Records"),
    path('staff/patients/records/retrieve/', views.retrieve_patient_records, name="Retrieve Patient Records"),
    path('staff/patients/records/update/', views.update_patient_records, name="Update Patient Records"),
    path('staff/patients/records/delete/', views.delete_patient_records, name="Delete Patient Records"),
    path('admin/staff/create/', views.create_doctor_account, name="Create Doctor Accounts"),
    path('admin/staff/edit/', views.modify_doctor_account, name="Edit Doctor Accounts"),
    path('admin/staff/delete/', views.delete_doctor_account, name="Delete Doctor Accounts")
    # path("create/", views.CreateMentcareAPIView.as_view(), name="Mentcare_create"),
    # path("update/<int:pk>/", views.UpdateMentcareAPIView.as_view(), name="update_Mentcare"),
    # path("delete/<int:pk>/", views.DeleteMentcareAPIView.as_view(), name="delete_Mentcare"),
    # path('docs/', include_docs_urls(title='Mentcare Api')),
]
