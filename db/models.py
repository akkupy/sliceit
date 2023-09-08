from django.db import models

# Create your models here.

class Link(models.Model):
    code = models.CharField(max_length=25,primary_key=True)
    short_url = models.CharField(max_length=35)
    full_short_url = models.CharField(max_length=45)
    target_url = models.CharField(max_length=320)
    is_active = models.BooleanField(default=True)
    clicks = models.IntegerField()
