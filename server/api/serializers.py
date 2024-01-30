from rest_framework import serializers
from .models.Post import Post
from django.contrib.auth.models import User

    


        


class UserSerializer(serializers.ModelSerializer):
    posts = serializers.PrimaryKeyRelatedField(many=True, queryset=Post.objects.all(), required=False)
    confirmPassword = serializers.CharField(required=False,default='')
 
    
    class Meta:
        model = User
        fields = ('id', 'username', 'posts', 'password', "confirmPassword")
        extra_kwargs = {'password': {'write_only': True}, 'confirmPassword': {'write_only': True}}
    
    def validate(self, attrs):
        username = attrs['username'].strip()
        password = attrs['password'].strip()
        confirm_password = attrs['confirmPassword'].strip()
        ##
        if not username or User.objects.filter(username=username).exists():
            raise serializers.ValidationError('choose another username')
        ##
        if not password or len(password) < 4:
            raise serializers.ValidationError('choose another password, min 4 characters')
        ##
        if password != confirm_password:
            raise serializers.ValidationError('confirm password and password must be the same')
        return attrs
    

    def create(self, validated_data):
        print(validated_data)
        validated_data.pop('confirmPassword')
        print(validated_data)
        user = User.objects.create_user(
            username = validated_data['username'],
            password = validated_data['password'],
        )
        user.save()
        return user
        

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Post
        fields = ( 'id', 'owner', 'title', 'content')
       


    
    
    
   