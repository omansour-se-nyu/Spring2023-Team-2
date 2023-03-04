from django.db import models
from django.contrib.auth.models import User, AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver


# Create your models here.
class MentcareModel(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    date_hired = models.DateField(auto_created=True)
    email = models.CharField(max_length=100)

    def __str___(self):
        return self.title


class MentcareLoginsModel(models.Model):
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    # email = models.CharField(max_length=100)

    def __str__(self):
        return self.username
