from google.appengine.ext import ndb
import math
class ImageInfo(ndb.Model):
    location=ndb.IntegerProperty(required=True)
    level=ndb.IntegerProperty(required=True)
    scaleAmount=ndb.IntegerProperty(required=True)
    image_url= ndb.StringProperty(required=False,default= 'https://www.tokkoro.com/picsup/1434470-landscape.jpg')
    url= ndb.StringProperty(required=False,default= 'https://www.reddit.com/r/dankmemes/')
    description=ndb.StringProperty(required=False,default="Null")
ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")
def getImages(i):
    return ImageInfo.query(ImageInfo.level==2,ImageInfo.location==i).fetch()
def fetchNearByImages(location,layer): 
    img_location=[]
    img_imgurl=[]
    img_scale=[]
    img_level=[]
    if(layer==2):
        unitsinY=80
    else:
        unitsinY=1200
    #this part returned the list of near by units
    list=[]   
    imagelist=[]
    for i in range(location-unitsinY-3,location-unitsinY+4):
        list.append(i)
        list.append(i+unitsinY)
        list.append(i+unitsinY*2)
        list.append(i+unitsinY*3)
        list.append(i+unitsinY*4)
        list.append(i+unitsinY*5)
        list.append(i+unitsinY*6)
    list.sort() #works
    list=[x for x in list if x >= 1 or x>6400 ]             
    for i in list:        
        imagelist.append(getImages(i))  
    for i in imagelist:
        img_location.append(i[0].location)
        img_imgurl.append(i[0].image_url)
        img_scale.append(i[0].scaleAmount)
        img_level.append(i[0].level)
    return {
        'img_location':img_location,
        'img_imgurl':img_imgurl,
        'img_level':img_level,
        'img_scale':img_scale
    }

    
    
   
    


