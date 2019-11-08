from google.appengine.ext import ndb
from Images import ImageInfo,ANCESTORY_KEY
arr =[]
def test():
    var = [1,2,3,4,5,6,7,8]
    ImageInfo(parent=ANCESTORY_KEY,location=3,level=3,pointerlist=var).put()
    fetched=ImageInfo.query(ImageInfo.location==3).fetch()
    
    print('TEST:  ',fetched[0].pointerlist[0])
        