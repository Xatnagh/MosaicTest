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

alreadyloadedlist=[] 
alreadyloadedlist_layer3=[] 
def getImages(i):
    ImageExist=ImageInfo.query(ImageInfo.level==2,ImageInfo.location==i).fetch()
    if ImageExist:
        return ImageExist
    
    else:
        placeholderImage=[ImageInfo( description=u'Null', image_url=u'https://www.tokkoro.com/picsup/1434470-landscape.jpg', level=3, location=i, scaleAmount=1200, url=u'https://www.reddit.com/r/dankmemes/')]
        return placeholderImage

def fetchNearByImages(location,layer): 
    img_location=[]
    img_imgurl=[]
    img_scale=[]
    img_level=[]
    if(layer==2):
        unitsinY=80
        maxindex=6400
    if(layer==3):
        unitsinY=1200
        maxindex=1440000
    #this part returned the list of near by units
    list=[] 
    imagelist=[]
  
    for i in range(location-unitsinY*5-6,location-unitsinY*5+7):
        list.append(i)
        list.append(i+unitsinY)
        list.append(i+unitsinY*2)
        list.append(i+unitsinY*3)
        list.append(i+unitsinY*4)
        list.append(i+unitsinY*5)
        list.append(i+unitsinY*6)
        list.append(i+unitsinY*7)
        list.append(i+unitsinY*8)
        list.append(i+unitsinY*9)    
    list.sort() #works
    
    list=[x for x in list if x >= 1]   #filters out out of bround locations
    list=[x for x in list if x <= maxindex] #filters out out of bround locations
    if(layer==2):
        list= set(list) - set(alreadyloadedlist) #remove items that are already loaded
        alreadyloadedlist.extend(list) #add list to already loaded since it will be sent to load
        
    if(layer==3):
        list= set(list) - set(alreadyloadedlist_layer3) 
        alreadyloadedlist_layer3.extend(list)
        # list.sort()
        # print(list)
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

    
    
   
    


