"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from  api import views 


urlpatterns = [
    path('', views.api_root),
    path('admin/', admin.site.urls),

    path('posts/', views.PostList.as_view(), name='post-list'),
    path('post/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),
   

    path('users/',views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/',views.UserDetail.as_view(), name='user-detail'),
    path('login/', views.login_view),
    path('logout/', views.logout_view),
    path('current-user/', views.current_user),
    
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns = format_suffix_patterns(urlpatterns)
