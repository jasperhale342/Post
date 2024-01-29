from rest_framework import serializers
from .models.Post import Post
from django.contrib.auth.models import User

    


        


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all())
    
    class Meta:
        model = User
        fields = ('id', 'username', 'posts', 'password')
        extra_kwargs = {'password': {'write_only': True}, 'confirmPassword': {'write_only': True}}
        def create(self, validated_data):
            user = User.objects.create_user(
                username = validated_data['username'],
                password = validated_data['password'],
            )
            return user
        

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = ( 'id', 'owner', 'title', 'content')
       


    
    
    
   