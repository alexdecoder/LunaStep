from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Machine_Group

section_load_threshold = 20

def dash_people(request):
    user = request.session.get('user', None)
    password = request.session.get('password', None)
    if user is not None and password is not None:
        user = authenticate(username=user, password=password)
        if user is not None:
            user_object = User.objects.get(username=user)
            first_set_users = []
            if user_object.is_superuser:
                index = 0
                for user in User.objects.all():
                    if index > section_load_threshold:
                        break
                    index += 1
                    first_set_users.append(user)

            context = {
                'username':user,
                'is_super':user_object.is_superuser,
                'title':'Home',
                'first_user_set':first_set_users,
                'first_name':user_object.first_name
            }

            if user_object.is_superuser:
                return render(request, 'dashboard/superuser.html', context)

            return render(request, 'dashboard/base.html', context)
        else:
            return redirect('login-main')
    else:
        return redirect('login-main')

def dash_main(request):
    is_auth, is_super_usr = auth_account(request)
    if is_auth and is_super_usr:
        return redirect('dashboard-super-main')
    elif is_auth and not is_super_usr:
        return render(request, 'dashboard/base.html') # TODO: show normal user stuff
    else:
        return redirect('login-main')

def dash_super_system_groups(request):
    is_auth, is_super_usr = auth_account(request)
    if is_auth and is_super_usr:
        username = request.session.get('username', None)
        user_object = User.objects.get(username=username)
        context = {
            'first_name': user_object.first_name,
            'is_super': user_object.is_superuser,
            'group_hiarchy': Machine_Group.objects.all()
        }
        return render(request, 'dashboard/superuser/system_groups.html', context)
    elif is_auth and not is_super_usr:
        return redirect('dashboard-main')
    else:
        return redirect('login-main')

def auth_account(request):
    username = request.session.get('username', None)
    password = request.session.get('password', None)
    if username and password:
        user = authenticate(username=username, password=password)
        if user:
            user_object = User.objects.get(username=username)
            if user_object.is_superuser:
                return True, True
            else:
                return True, False
        else:
            return False, False
    else:
        return False, False
