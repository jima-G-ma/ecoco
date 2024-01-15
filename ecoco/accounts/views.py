from django.shortcuts import render

from django.shortcuts import render
from django.http.response import HttpResponseedirect
from django.urls import reverse
from .forms import SigninForm
# ログイン関係
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login, logout
from allauth.account.views import EmailView

from django.core.mail import BadHeaderError, send_mail
from django.http import HttpResponse, HttpResponseRedirect

User = get_user_model()

def signin(request):
    """ログイン
    """
    if request.method != 'POST':
        if str(request.user) != 'AnonymousUser':
            form = ''
        else:
            form = SigninForm()
    else:
        form = SigninForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            username = form.cleaned_data['username']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect(reverse('ecoco_app/index.html'))
            else:
                pass
    context = {
        'form': form
    }
    return render(request, 'ecoco_app/index.html', context)