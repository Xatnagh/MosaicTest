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
            print("done for 2")     
            for i in range(1):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=3,pointer=True,pointerlist=[1,2,1201,1202],image_url='/script/test.jpg',scalewidth=2,scaleheight=2).put()
def alreadyexist(list):  
    load=False
    for i in range(len(list)):
        print(i)
        print('list',list[i])
        imageexist= ImageInfo.query(ImageInfo.location==list[i], ImageInfo.level==3).fetch()
        print(imageexist)
        if imageexist:
              
            load=True
    return load   
def loadtest():
    print('test done')
    for i in range(1):
                ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=True,pointerlist=[1,2,1201,1202],image_url='/images/test.jpg',scalewidth=2,scaleheight=2).put()

        


