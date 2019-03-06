from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.dash_main, name='dashboard-main'),
    path('superuser/', views.dash_super_system_groups, name='dashboard-super-main')
]