from django.test import TestCase
from server.api.models.Post import Post
from django.contrib.auth.models import User


class RegisterTest(TestCase):
    def setUp(self):
        user_obj = User.objects.create_user(username="test", password="test")
        user_id = user_obj.id
        Post.objects.create(owner=user_id, title="test title", content="test content")
    def test_Post(self):
        post = Post.objects.get()[0]
        self.assertEqual(post.title, "test title")
        self.assertEqual(post.title, "test content")