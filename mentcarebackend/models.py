from django.db import models


# Create your models here.
class MentcareModel(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    date_hired = models.DateField(auto_created=True)
    email = models.CharField(max_length=100)

    def __str___(self):
        return self.title
