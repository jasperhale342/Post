from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
   
    username = data['username'].strip()
    password = data['password'].strip()
    confirm_password = data['confirmPassword'].strip()
    ##
    if not username or UserModel.objects.filter(username=username).exists():
        raise ValidationError('choose another email')
    ##
    if not password or len(password) < 4:
        raise ValidationError('choose another password, min 4 characters')
    ##
    if password != confirm_password:
        raise ValidationError('confirm password and password must be the same')
    return data



def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('choose another username')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('a password is needed')
    return True

