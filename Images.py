from google.appengine.ext import ndb

class ImageInfo(ndb.Model):
    location=ndb.IntegerProperty(required=True)
    scaleAmount=ndb.IntegerProperty(required=True)
    image_url= ndb.StringProperty(required=False,default= 'https://www.tokkoro.com/picsup/1434470-landscape.jpg')
    url= ndb.StringProperty(required=False,default= 'https://www.reddit.com/r/dankmemes/')
    description=ndb.StringProperty(required=False,default="Null")


ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")