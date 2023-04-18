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

from mentcarebackend import views

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('login/', views.login_view, name="Login Page"),
    path('logout/', views.logout, name="Logout"),
    path('account/register/', views.register_user, name="Registration Page"),
    path('account/change-password/', views.change_password, name="Change Password"),
    path('staff/patients/records/create/', views.create_patient_records, name="Create Patient Records"),
    path('staff/patients/records/retrieve/', views.retrieve_patient_records, name="Retrieve Patient Records"),
    path('staff/patients/records/update/', views.update_patient_records, name="Update Patient Records"),
    path('staff/patients/records/delete/<int:patient_id>/', views.delete_patient_records, name="Delete Patient Records"),
    path('staff/patients/daily-summary/', views.daily_patient_summary, name="Daily Patient Summary"),
    path('staff/download/', views.download_database, name="Cache Database"),
    path('admin/staff/create/', views.create_doctor_account, name="Create Doctor Accounts"),
    path('admin/staff/edit/', views.modify_doctor_account, name="Edit Doctor Accounts"),
    path('admin/staff/delete/', views.delete_doctor_account, name="Delete Doctor Accounts")
]
