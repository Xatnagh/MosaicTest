from Images import ImageInfo, ANCESTORY_KEY
from google.appengine.ext import ndb
def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.scaleAmount==16).fetch(2)
        if not a:          
            for i in range(1,257):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=16,level=1).put()
            for i in range(1,6401):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=80,level=2).put()


