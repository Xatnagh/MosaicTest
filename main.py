import webapp2
import os
import random
import jinja2
from database import defaultdatas
from Images import ImageInfo

the_jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
extensions=['jinja2.ext.autoescape'],autoescape=True)

def getData():
    return ImageInfo.query().order(ImageInfo.location).fetch()

class Home(webapp2.RequestHandler):
    def get(self):
        homepage = the_jinja_env.get_template('/template/mosaic.html')
        self.response.write(homepage.render( {"data":getData()}))

class AddImage(webapp2.RequestHandler):
    def get(self):
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render({"data":data}))
class loadImages(webapp2.RequestHandler):
    def get(self):  
        defaultdatas()
        homepage = the_jinja_env.get_template('/template/addImages.html')
        self.response.write(homepage.render({"data":getData}))



app = webapp2.WSGIApplication([
('/',Home),
('/addImage',AddImage),
 ('/load', loadImages),
# ('/contact',Contact),
# ('/login',LoginPage)
], debug=True)
