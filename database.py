from Images import ImageInfo, ANCESTORY_KEY
from google.appengine.ext import ndb
def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.scaleAmount==16).fetch(2)
        if not a:          
            for i in range(1,257):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=16,level=1).put()
            print('done for 1')    
            for i in range(1,6401):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=80,level=2).put()
            print("done") 
def loadlayer3():
    for i in range(1,1440000):
        ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=1200,level=3).put()

    


