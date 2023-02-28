from django.db import models
from rest_framework.authtoken.models import Token


# Create your models here.
class MentcareModel(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    date_hired = models.DateField(auto_created=True)
    email = models.CharField(max_length=100)

    def __str___(self):
        return self.title


class MentcareLogins(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title
