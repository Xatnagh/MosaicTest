from Images import ImageInfo, ANCESTORY_KEY
from google.appengine.ext import ndb
def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.level==1).fetch(2)
        if not a:          
            for i in range(1,257):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=1).put()
            print('done for 1')    
            for i in range(1,201):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=2).put()
                print("done") 

    


