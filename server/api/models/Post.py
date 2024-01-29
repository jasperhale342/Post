
# blog/models.py
from django.conf import settings
from django.db import models
 
class Post(models.Model):
    owner = models.ForeignKey('auth.User', related_name='posts', on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()