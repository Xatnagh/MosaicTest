import webapp2
import json
import os
import urllib2
import random
import jinja2
import re
from database import defaultdatas, alreadyexist,clearentiredatabase,putDataintodatabase,upload_file,putImageIntoDatabase_layer1,putImageIntoDatabase_layer2,getupperlayeroflocation,getlocationlist,getupperlayeroflocation_fromlist_layer2,generateavaliable_spots
from Images import ImageInfo,ANCESTORY_KEY,getImageInfo,getimagesbylocation,getImages
from test import test

the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)

class Home(webapp2.RequestHandler):
    def get(self): 
        test()
        homepage = the_jinja_env.get_template('/template/mosaic.html')  
        self.response.write(homepage.render({"data":getLayer1()}))
        

class AddImage(webapp2.RequestHandler):
    def get(self):
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render())
    
class loadImages(webapp2.RequestHandler):
    def get(self):
        defaultdatas()
        generateavaliable_spots()
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render({"data":getLayer1()}))

class update(webapp2.RequestHandler):
    def get(self):#this is for loading nearby images
        locationlist=self.request.GET.get('arraytosend')
        parsedlist= json.loads(locationlist)
        level=int(self.request.GET.get('level'))
        imagebylocation=getimagesbylocation(parsedlist,level,[])
        self.response.write(json.dumps(imagebylocation))

    #this is for the layer 3 images
    def post(self):
        pointerlocation=int(self.request.POST.get('pointerlocation'))
        image=str(self.request.get('image'))
        description=self.request.POST.get('description')
        height=int(self.request.POST.get('height'))
        width=int(self.request.POST.get('width'))
        locationlist=getlocationlist(pointerlocation,height,width)
        if len(image)>500:
            imageurl= upload_file(image,pointerlocation) 
        else:
           imageurl=image
        putDataintodatabase(pointerlocation,locationlist,imageurl,description,width,height)
        self.response.write("success")
        
class updatelayers(webapp2.RequestHandler):
    def get(self): #this is used only for when user selects the two boxes on image upload
        bottomleft=int(self.request.get('bottomleft'))
        height=int(self.request.get('height'))
        width=int(self.request.get('width'))
        locationlist=getlocationlist(bottomleft,height,width)
        upperlayerlist=getupperlayeroflocation_fromlist_layer2(locationlist[0],locationlist[len(locationlist)-1])
        imagebylocation=getimagesbylocation(locationlist,2,upperlayerlist)
        self.response.write(json.dumps(imagebylocation))

    def post(self):
        self.response.headers.add_header('Access-Control-Allow-Origin', '*')
        image=str(self.request.get('image'))
        location=int(self.request.get('location'))
        layer=int(self.request.get('layer'))
        layer1location1=int(self.request.get('upperlayerlocation'))
        imageexist=ImageInfo.query(ImageInfo.location==location,ImageInfo.level==layer).fetch()
        if(layer==2):
            imageurl=putImageIntoDatabase_layer2(image,location)
        else:
            imageurl=putImageIntoDatabase_layer1(image,location)
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
class getImageIinfo(webapp2.RequestHandler):
    def get(self):
        location=int(self.request.GET.get('location'))  
        image=getImageInfo(location)
        data={
            'image_imgUrl':image[0].image_url,
            'image_description':image[0].description,
            'location':location
        }
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        self.response.write(json.dumps(data))
   
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

