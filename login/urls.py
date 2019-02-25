from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.login, name='login-main'),
    path('verlogin/', views.verify_login, name='login-verify')
]