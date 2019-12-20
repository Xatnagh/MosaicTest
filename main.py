import webapp2
import json
import os
import urllib2
import random
import jinja2
import re
from database import defaultdatas, alreadyexist, loadtest,clearlevel2,putDataintodatabase,upload_file,putImageIntoDatabase_layer1,putImageIntoDatabase_layer2,getupperlayeroflocation
from Images import ImageInfo,ANCESTORY_KEY,getImageInfo,getimagesbylocation,getImages

the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)

class Home(webapp2.RequestHandler):
    def get(self): 
        # lol=[81,82,1,2]
        # level=2
        # a=getImages(lol,level)
        self.response.headers['Access-Control-Allow-Origin'] = '*'
        # self.response.headers.add_header('Access-Control-Allow-Headers', 'Content-Type')
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
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render({"data":getLayer1()}))

class update(webapp2.RequestHandler):
    def get(self):
        locationlist=self.request.GET.get('arraytosend')
        parsedlist= json.loads(locationlist)
        level=int(self.request.GET.get('level'))
        imagebylocation=getimagesbylocation(parsedlist,level,[])
        self.response.write(json.dumps(imagebylocation))

    def post(self):
        pointerlocation=self.request.POST.get('pointerlocation')
        locationlist=self.request.POST.get('locationlist')
        locationlist=json.loads(locationlist)
        image=str(self.request.get('image'))
        description=self.request.POST.get('description')
        url=self.request.POST.get('url')
        height=int(self.request.POST.get('height'))
        width=int(self.request.POST.get('width'))
        if len(image)>500:
            imageurl= upload_file(image,pointerlocation) 
        else:
           imageurl=image
        
        putDataintodatabase(pointerlocation,locationlist,imageurl,description,url,width,height)
        self.response.write("success")
        
class updatelayers(webapp2.RequestHandler):
    def get(self): #this is used only for when user selects the two boxes on image upload
        locationlist=self.request.GET.get('locationlist')
        locationlist= json.loads(locationlist)
        upperlayerlist=self.request.GET.get('upperlocationarray')
        upperlayerlist= json.loads(upperlayerlist)
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
            imageexist[0].layer1location=layer1location1
        else:
            imageurl=putImageIntoDatabase_layer1(image,location)
        if imageexist:
            imageexist[0].image_url=imageurl
            imageexist[0].put()
        else:
            ImageInfo(parent=ANCESTORY_KEY,image_url=imageurl,location=location,level=layer,layer1location=layer1location1).put()
        
        

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
        self.response.write(homepage.render( {"data":getLayer1()}))
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

