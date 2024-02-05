

from pathlib import Path
import os
from dotenv import load_dotenv
load_dotenv()  

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = False


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    "corsheaders",
    'api',

]

# WhiteNoise configuration
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Add whitenoise middleware after the security middleware
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    
]
ROOT_URLCONF = 'server.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'server.wsgi.application'

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
AUTHENTICATION_BACKENDS = [
        'django.contrib.auth.backends.ModelBackend',
    ]


STORAGES = {
    # ...
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


# Configure Postgres database based on connection string of the libpq Keyword/Value form
# https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING
conn_str = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
conn_str_params = {pair.split('=')[0]: pair.split('=')[1] for pair in conn_str.split(' ')}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': conn_str_params['dbname'],
        'HOST': conn_str_params['host'],
        'USER': conn_str_params['user'],
        'PASSWORD': conn_str_params['password'],
    }
}

CACHES = {
        "default": {  
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": os.environ.get('AZURE_REDIS_CONNECTIONSTRING'),
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient",
                "COMPRESSOR": "django_redis.compressors.zlib.ZlibCompressor",          
        },
    }
}
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
         'rest_framework.permissions.IsAuthenticated',
          'rest_framework.permissions.AllowAny'
        
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication'
    ],
    # 'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    # 'PAGE_SIZE': 10,
     'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
    
}
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
SECURE_SSL_REDIRECT = os.environ['SECURE_SSL_REDIRECT'] == 'True'
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']] if 'WEBSITE_HOSTNAME' in os.environ else []
"CUSTOM_DOMAIN" in os.environ and ALLOWED_HOSTS.append(os.environ["CUSTOM_DOMAIN"])

CORS_ALLOWED_ORIGINS = [os.environ['CORS_ALLOWED_ORIGINS']] if 'CORS_ALLOWED_ORIGINS' in os.environ else []
CORS_ALLOW_CREDENTIALS = os.environ['CORS_ALLOW_CREDENTIALS'] == 'True'
CORS_ALLOW_HEADERS = ('x-csrftoken', 'content-type', 'Access-Control-Allow-Credentials')

CSRF_TRUSTED_ORIGINS = [os.environ['CSRF_TRUSTED_ORIGINS']] if 'CSRF_TRUSTED_ORIGINS' in os.environ else []
CSRF_TRUSTED_ORIGINS.append('https://' + os.environ['WEBSITE_HOSTNAME'])
CSRF_COOKIE_DOMAIN=[os.environ['CSRF_COOKIE_DOMAIN']]
CSRF_COOKIE_SAMESITE = os.environ['CSRF_COOKIE_SAMESITE']
CSRF_COOKIE_SECURE = os.environ['CSRF_COOKIE_SECURE'] == 'True'
CSRF_USE_SESSIONS = os.environ['CSRF_USE_SESSIONS'] == 'True'

# SESSION_SAVE_EVERY_REQUEST=True
SESSION_COOKIE_SAMESITE = os.environ['SESSION_COOKIE_SAMESITE']
SESSION_COOKIE_DOMAIN=[os.environ['SESSION_COOKIE_DOMAIN']]
SESSION_COOKIE_SECURE = os.environ['SESSION_COOKIE_SECURE'] == 'True'


