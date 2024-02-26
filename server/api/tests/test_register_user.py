from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client
import json


class RegisterTest(TestCase):
    def setUp(self):
        self.c = Client()
        User.objects.create(username="test", password="test")

    def test_username_taken(self):
        data = {"username":"test", "password":"test", "confirmPassword":"test"}
        response = self.c.post("/users/", data=data)
    
        self.assertEqual(''.join(response.data['username']), "A user with that username already exists.")
        self.assertEqual(response.status_code, 400)
        


    def test_no_username(self):
        data = {"username":"", "password":"test", "confirmPassword":"test"}
        response = self.c.post("/users/", data=data)
        message = json.loads(response.content)['username'][0]
        self.assertEqual(message, "This field may not be blank.")
        self.assertEqual(response.status_code, 400)


    def test_password_less_than_four_characters(self):
        data = {"username":"hello", "password":"123", "password2":"123"}
        response = self.c.post("/users/", data=data)
        message = json.loads(response.content)['password'][0]
        self.assertEqual(message, "choose another password, min 4 characters")
        self.assertEqual(response.status_code, 400)

    def test_password_and_confirmPassword_do_not_match(self):
        data = {"username":"hello", "password":"not test", "password2":"test"}
        response = self.c.post("/users/", data=data)
        message = json.loads(response.content)['password'][0]
        self.assertEqual(message, "confirm password and password must be the same")
        self.assertEqual(response.status_code, 400)


