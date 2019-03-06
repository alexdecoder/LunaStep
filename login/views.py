from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate

def login(request):
    username = request.session.get('username', None)
    password = request.session.get('password', None)
    if username is not None and password is not None:
        return redirect('dashboard-main')
    else:
        return render(request, 'login/base.html')

def verify_login(request):
    username = request.POST.get('username', None)
    password = request.POST.get('password', None)
    if username is not None and password is not None:
        user = authenticate(username=username, password=password)
        if user is not None:
            request.session['username'] = username
            request.session['password'] = password
            
            return HttpResponse('valid')
        else:
            return HttpResponse('incorrect')
    else:
        return HttpResponse('missing_param')