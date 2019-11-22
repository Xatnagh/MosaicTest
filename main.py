import webapp2
import json
import os
import urllib2
import random
import jinja2
import re
from database import defaultdatas, alreadyexist, loadtest,clearlevel2,putDataintodatabase
from Images import ImageInfo,ANCESTORY_KEY,getImageInfo,getimagesbylocation
from test import  blob_to_image_converter


the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)


def getData():
      return ImageInfo.query(ImageInfo.level==1).fetch()
class Home(webapp2.RequestHandler):
    def get(self):
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render( {"data":getData()}))

class AddImage(webapp2.RequestHandler):
    def get(self):
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render())
class loadImages(webapp2.RequestHandler):
    def get(self):  
        defaultdatas()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render({"data":getData()}))
class update(webapp2.RequestHandler):
    def get(self):
        locationlist=self.request.GET.get('arraytosend')
        parsedlist= json.loads(locationlist)
        level=int(self.request.GET.get('level'))
        self.response.write(json.dumps(getimagesbylocation(parsedlist,level)))
    def post(self):
        pointerlocation=self.request.POST.get('pointerlocation')
        locationlist=self.request.POST.get('locationlist')
        locationlist=json.loads(locationlist)
        image=self.request.get('image')
        description=self.request.POST.get('description')
        url=self.request.POST.get('url')
        height=int(self.request.POST.get('height'))
        width=int(self.request.POST.get('width'))
        putDataintodatabase(pointerlocation,locationlist,image,description,url,width,height)
        self.response.write("success")
        
class contact(webapp2.RequestHandler):
    def get(self):
        t = the_jinja_env.get_template('/template/contact.html')
        self.response.write(t.render())
        
class LoginPage(webapp2.RequestHandler):
    def get(self):
        t = the_jinja_env.get_template('/template/login.html')
        self.response.write(t.render())

class cleardatabase(webapp2.RequestHandler):
    def get(self):
        clearlevel2()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render( {"data":getData()}))
class getImageIinfo(webapp2.RequestHandler):
    def get(self):
        location=int(self.request.GET.get('location'))  
        image=getImageInfo(location)
        data={
            'image_imgUrl':image[0].image_url,
            'image_description':image[0].description,
            'image_url':image[0].url,
            'location':location
        }
        self.response.write(json.dumps(data))
   


        


app = webapp2.WSGIApplication([
('/',Home),
('/addImage',AddImage),
 ('/load', loadImages),
 ('/update', update),
('/contact',contact),
('/clear',cleardatabase),
('/login',LoginPage),
('/imageinfo',getImageIinfo)
], debug=True)

