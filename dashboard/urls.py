from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='dashboard-main'),
    path('sessdest/', views.destroy_session)
]