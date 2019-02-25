from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate

def main(request):
    user = request.session.get('user', None)
    password = request.session.get('password', None)
    if user is not None and password is not None:
        user = authenticate(username=user, password=password)
        if user is not None:
            return HttpResponse("dashboard page!")
        else:
            return redirect('login-main')
    else:
        return redirect('login-main')

def destroy_session(request):
    del request.session['user']
    del request.session['password']

    return HttpResponse('session_destroyed')