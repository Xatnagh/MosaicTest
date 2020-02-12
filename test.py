from google.appengine.ext import ndb
from google.appengine.api import images
from Images import ImageInfo
def test():
    a=ImageInfo.query(ImageInfo.location>=2, ImageInfo.location<=1203,ImageInfo.level==3).fetch()
    # put every condition in separate commas
    for image in a:
        print(image.location)