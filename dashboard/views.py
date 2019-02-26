from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

section_load_threshold = 20

def main(request):
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

def destroy_session(request):
    del request.session['user']
    del request.session['password']

    return HttpResponse('session_destroyed')