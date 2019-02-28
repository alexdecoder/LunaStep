from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

def api_search(request):
    search_object = request.GET.get('searchdata', None)
    if search_object:
        if auth_against_database(request, True):
            filtered_users = User.objects.filter(username__icontains=search_object)
            raw_users = []
            for user in filtered_users:
                raw_users.append(user.username)
            return JsonResponse({'people':raw_users, 'auth_status':True})
        else:
            return JsonResponse({'auth_status':False})
    else:
        return JsonResponse({'auth_status':True})

def auth_against_database(request, requires_superperms):
    username = request.session.get('user', None)
    password = request.session.get('password', None)
    user = authenticate(username=username, password=password)
    if user is not None:
        if not requires_superperms:
            return True
        else:
            if User.objects.get(username=username).is_superuser:
                return True
            else:
                return False
    else:
        return False
