import json
from django.test import Client, TestCase
from api.models.Post import Post
from django.contrib.auth.models import User
from rest_framework.request import Request


class RegisterTest(TestCase):
    def setUp(self):
        self.c = Client()
        self.user_obj = User.objects.create_user(username="test", password="test")
        self.post = Post.objects.create(owner=self.user_obj, title="test title", content="test content")
    def test_post_get(self):
        res = self.c.get("/posts/")
        post = json.loads(res.content)[0]
        self.assertEqual(post["title"], "test title")
        self.assertEqual(post["content"], "test content")
        self.assertEqual(res.status_code, 200)
        
    def test_post_create(self):
        post = {"title": "new title", "content": "new content"}
        login_data  = {"username":"test", "password":"test"}
        self.c.post(path="/login/", data=login_data)
        res = self.c.post(path="/posts/", data=post)
        self.assertEqual(res.status_code, 201)
        post_id = json.loads(res.content)["id"]
        created_post = Post.objects.get(pk=post_id)
        self.assertEqual(created_post.title, "new title")
        self.assertEqual(created_post.content, "new content")
        self.assertEqual(created_post.owner.username, "test")
    
        
        
    def test_post_update(self):
        
        post_update = {"owner": str(self.user_obj.id), "title": "updated title", "content": "updated content"}
        login_data  = {"username":"test", "password":"test"}
        self.c.post(path="/login/", data=login_data)
        
        post_id = self.post.id
        url = "/post/" + str(post_id) + "/"
        res = self.c.put(path=url, data=post_update, content_type='application/json')
        
        self.assertEqual(res.status_code, 200)
        created_post = Post.objects.get(pk=self.post.id)
        
        self.assertEqual(created_post.title, "updated title")
        self.assertEqual(created_post.content, "updated content")
        self.assertEqual(created_post.owner.username, "test")
    
        
        
        
    def test_Post_delete(self):
        login_data  = {"username":"test", "password":"test"}
        self.c.post(path="/login/", data=login_data)
        res = self.c.delete("/post/" + str(self.post.id) +'/')
        self.assertEqual(res.status_code, 204)
        try:
            post = Post.objects.get(pk=self.post.id)
        except Post.DoesNotExist:
            post = None
        self.assertEqual(post, None)
        
    def test_update_other_owners_post(self):
        user_obj = User.objects.create_user(username="another", password="test")
        post_update = {"owner": str(user_obj.id), "title": "updated title", "content": "updated content"}
        
        post_id = self.post.id
        url = "/post/" + str(post_id) + "/"
        res = self.c.put(path=url, data=post_update, content_type='application/json')
        
        self.assertEqual(res.status_code, 403)
        post = Post.objects.get(pk=self.post.id)
        
        self.assertEqual(post.title, "test title")
        self.assertEqual(post.content, "test content")
        self.assertEqual(post.owner.username, "test")
        
