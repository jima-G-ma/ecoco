from django import forms
from django.core.exceptions import ValidationError

# ログイン
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

# 例外処理
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class SigninForm(forms.Form):
    """ログインフォーム
    """
    email = forms.EmailField(
        required=True,
        max_length=255,
        min_length=3,
        widget=forms.EmailInput(
            attrs={
                'placeholder': 'your-email@example.com',
            }
        )
    )
    password = forms.CharField(
        required=True,
        max_length=255,
        min_length=6,
        widget=forms.PasswordInput(
            attrs={
                'placeholder': '******',
            }
        )
    )
    def clean(self):
        cleaned_data = super(SigninForm, self).clean()
        if 'email' and 'password' in cleaned_data:
            try:
                user = User.objects.get(email=cleaned_data['email'])
            except:
                raise ValidationError('メールアドレスかパスワードが間違っています。')
            auth_result = authenticate(
                username=str(user),
                password=cleaned_data['password']
            )
            if not auth_result:
                raise ValidationError('メールアドレスかパスワードが間違っています。')
            cleaned_data['username'] = str(user)
            return cleaned_data
    def clean_email(self):
        email = self.cleaned_data['email']
        return email
    def clean_password(self):
        password = self.cleaned_data['password']
        return password
    def cleaned_username(self):
        username = self.cleaned_data['username']
        return username