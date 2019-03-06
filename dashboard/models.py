from django.db import models
from django.contrib.auth.models import User

class Machine_Group_Sub(models.Model):
    name = models.CharField(max_length=50)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name
class Machine_Group(models.Model):
    name = models.CharField(max_length=50)
    sub_groups = models.ManyToManyField(Machine_Group_Sub)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name
