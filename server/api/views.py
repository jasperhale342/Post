from .validation import custom_validation
from .models.Post import Post
from.serializers import PostSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework import generics, viewsets
from .permissions import IsOwnerOrReadOnly
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.reverse import reverse
from django.contrib.auth import authenticate, login, logout, get_user
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.http import HttpResponse
from rest_framework.authentication import SessionAuthentication
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer
from django.http import HttpRequest


import json

# Create your views here.

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'posts': reverse('post-list', request=request, format=format)
    })

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
@authentication_classes((SessionAuthentication,))
def login_view(request):
    
    print(request.body)
    u = request.data['username']
    p = request.data['password']
    print("username: " + u + " password: ", p)
   
    # print(username + " " + password)
    user = authenticate(request, username=u, password=p)
    print("user is: ", user)
    if user is not None:
        login(request, user)
        request.session.modified = True 
        serializer = UserSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        errors = {"errors": "username or password is not correct"}
        return Response(errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
@authentication_classes(())
def logout_view(request):
    logout(request)
    request.session.modified = True 
    return Response(status=status.HTTP_200_OK)

    # Redirect to a success page.      

@api_view(['GET'])
@permission_classes((permissions.AllowAny,))
def current_user(request):
    r_user = get_user(request)
    if r_user.id != None:
        user = User.objects.get(id=r_user.id)
        serializer= UserSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(({"message":"user not signed in"}), status=status.HTTP_200_OK)
    # Redirect to a success page.     



class PostList(APIView):
    """
    List all posts, or create a post.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = (SessionAuthentication,)
   
    def get(self, request, format=None):
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
        
    
    
    
    def post(self, request, format=None):
        print(request.data)
     
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PostDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = (SessionAuthentication,)
    
    def get_object(self, pk):
        try:
            return Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        post = self.get_object(pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        print("this is the pk", pk)
        post = self.get_object(pk)
        serializer = PostSerializer(post, data=request.data)
        self.check_object_permissions(request=request, obj=post)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        post = self.get_object(pk)
        self.check_object_permissions(request=request, obj=post)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserList(APIView):
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404
    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    