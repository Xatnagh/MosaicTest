import webapp2
import json
import os
import urllib2
import random
import jinja2
import re
from database import checkavaliablity, defaultdatas,clearentiredatabase,putDataintodatabase,upload_file,putImageIntoDatabase_layer1,putImageIntoDatabase_layer2,getupperlayeroflocation,getlocationlist,getupperlayeroflocation_fromlist_layer2
from Images import ImageInfo,ANCESTORY_KEY,getImageInfo,getimagesbylocation,getImages
from test import test

the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)

class Home(webapp2.RequestHandler):
    def get(self): 
        homepage = the_jinja_env.get_template('/template/mosaic.html')  
        self.response.write(homepage.render({"data":getLayer1()}))

class AddImage(webapp2.RequestHandler):
    def get(self):
        
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render())
    
class loadImages(webapp2.RequestHandler):
    def get(self):
        defaultdatas()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render({"data":getLayer1()}))

class update(webapp2.RequestHandler):
    def get(self):#this is for loading nearby images
        locationlist=self.request.GET.get('arraytosend')
        parsedlist= json.loads(locationlist)
        level=int(self.request.GET.get('level'))
        imagebylocation=getimagesbylocation(parsedlist,level,[])
        self.response.write(json.dumps(imagebylocation))

    #this is for uploading layer 3 images
    def post(self):
        pointerlocation=int(self.request.POST.get('pointerlocation'))
        image=str(self.request.get('image'))
        description=self.request.POST.get('description')
        height=int(self.request.POST.get('height'))
        width=int(self.request.POST.get('width'))
        locationlist=getlocationlist(pointerlocation,height,width)
        if len(image)>500: #this is here cus if the image is in base64, then it will be greather than 500, while normal urls won't be
            imageurl= upload_file(image,pointerlocation) 
        else:
           imageurl=image
        putDataintodatabase(pointerlocation,imageurl,description,width,height)
        self.response.write("success")
        
class updatelayers(webapp2.RequestHandler):
    def get(self): #this is used only for when user selects the two boxes on image upload
        bottomleft=int(self.request.get('bottomleft'))
        height=int(self.request.get('height'))
        width=int(self.request.get('width'))
        upperlayerlocation=getupperlayeroflocation_fromlist_layer2(bottomleft,width,height)
        allspotsavaliable=checkavaliablity(bottomleft,width,height,upperlayerlocation)
        self.response.write(allspotsavaliable)

    def post(self):
        image=str(self.request.get('image'))
        location=int(self.request.get('location'))
        layer=int(self.request.get('layer'))
        layer1location1=int(self.request.get('upperlayerlocation'))
        imageexist=ImageInfo.query(ImageInfo.location==location,ImageInfo.level==layer).fetch()#this is to update level 1 and 2, DO NOT TOUCH
        if(layer==2):
            imageurl=putImageIntoDatabase_layer2(image,location)#upload image into GCS
        else:
            imageurl=putImageIntoDatabase_layer1(image,location)#upload image into GCS
        if imageexist:
            imageexist[0].image_url=imageurl
            if(layer==2):
                imageexist[0].layer1location=layer1location1
            imageexist[0].put()
        else:
            image=ImageInfo(parent=ANCESTORY_KEY,image_url=imageurl,location=location,level=layer)
            if(layer==2):
               image.layer1location=layer1location1
            image.put()
class getImageIinfo(webapp2.RequestHandler):
    def get(self):
        location=int(self.request.GET.get('location'))  
        image=getImageInfo(location)
        data={
            'image_imgUrl':image.image_url,
            'image_description':image.description,
            'location':location
        }
        self.response.write(json.dumps(data))
       
            
        

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
        clearentiredatabase()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render( {"data":getLayer1()}))
    def post(self):
        result=5
        password=self.request.get('password')
        if(password=="261221151221"):
            result=clearentiredatabase()
        self.response.write(result)

def getLayer1():
      return ImageInfo.query(ImageInfo.level==1).fetch()

        


app = webapp2.WSGIApplication([
('/',Home),
('/addImage',AddImage),
 ('/load', loadImages),
 ('/update', update),
('/update_layers',updatelayers),
('/contact',contact),
('/clear',cleardatabase),
('/login',LoginPage),
('/imageinfo',getImageIinfo)
], debug=True)

