from django.test import TestCase
from server.api.models.Post import Post
from django.contrib.auth.models import User
from server.api.serializers import UserSerializer


class RegisterTest(TestCase):
    def setUp(self):
        
        User.objects.create(username="test", password="test")

    def test_username_taken(self):
        data = {"username":"test", "password":"test", "confirmPassword":"test"}
        serializer = UserSerializer(data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(serializer.errors, {"error":'Please choose another username'})
        


    def test_no_username(self):
        pass

    def test_no_password(self):
        pass
    def test_password_less_than_four_characters(self):
        pass

    def test_password_and_confirmPassword_do_not_match(self):
        pass


