import webapp2
import json
import os
import urllib2
import random
import jinja2
from database import defaultdatas, alreadyexist, loadtest
from Images import ImageInfo, fetchNearByImages,ANCESTORY_KEY,getImageInfo,getimagesbylocation
from test import test


the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)


def getData():
      return ImageInfo.query(ImageInfo.level==1).fetch()
class Home(webapp2.RequestHandler):
    def get(self):
        # loadtest()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render( {"data":getData()}))

class AddImage(webapp2.RequestHandler):
    def get(self):
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render())
class loadImages(webapp2.RequestHandler):
    def get(self):  
        defaultdatas()
        # loadlayer3()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render({"data":getData()}))
class update(webapp2.RequestHandler):
    def get(self):
        location=int(self.request.GET.get('location'))
        layer=int(self.request.GET.get('layer'))
        datasentback=fetchNearByImages(location,layer)
        self.response.write(json.dumps(datasentback))
    def post(self):
        locationlist=self.request.POST.get('arraytosend')
        parsedlist= json.loads(locationlist)
        self.response.write(json.dumps(getimagesbylocation(parsedlist)))
        

class fillintherest(webapp2.RequestHandler):
    def get(self):
        list=[]
        for i in ImageInfo.query(ImageInfo.location>2000).fetch():
            list.append(i.location)
            listlength=len(list)
        for i in range(list[listlength-1],6401):
            ImageInfo(parent=ANCESTORY_KEY,location=i,level=2).put()
class contact(webapp2.RequestHandler):
    def get(self):
        t = the_jinja_env.get_template('/template/contact.html')
        self.response.write(t.render())

class LoginPage(webapp2.RequestHandler):
    def get(self):
        t = the_jinja_env.get_template('/template/login.html')
        self.response.write(t.render())
        
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
 ('/fill',fillintherest),
('/contact',contact),
('/login',LoginPage),
('/imageinfo',getImageIinfo)
], debug=True)

