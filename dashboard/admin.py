from django.contrib import admin
from . import models

class AdminMachine_Group(admin.ModelAdmin):
    pass
admin.site.register(models.Machine_Group, AdminMachine_Group)
class AdminMachine_Group_Sub(admin.ModelAdmin):
    pass
admin.site.register(models.Machine_Group_Sub, AdminMachine_Group_Sub)