from google.appengine.ext import ndb
import math

 
class ImageInfo(ndb.Model):
    location=ndb.IntegerProperty(required=True)
    level=ndb.IntegerProperty(required=True)
    image_url= ndb.StringProperty(required=False)
    url= ndb.StringProperty(required=False)
    description=ndb.StringProperty(required=False)
    scalewidth= ndb.IntegerProperty(required=False)
    scaleheight= ndb.IntegerProperty(required=False)
    pointer=ndb.BooleanProperty(required=False,default=False)
    pointerlocation=ndb.IntegerProperty(required=False)
    pointerlist=ndb.IntegerProperty(required=False,repeated=True)

ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")

def getImages(i,level):
    ImageExist=ImageInfo.query(ImageInfo.level==level,ImageInfo.location==i).fetch()
    if ImageExist:
        if(ImageExist[0].pointer==False):
            return ImageExist
        else:
            return ImageInfo.query(ImageInfo.location==ImageExist[0].pointerlist[0]).fetch()
    elif level==2:
        placeholderImage=[ImageInfo( description=u'Null', image_url=u'/images/uploadYourOwn.jpg', level=2, location=i, url=u'https://www.reddit.com/r/dankmemes/',scalewidth=1,scaleheight=1)]
        return placeholderImage
    else:
        placeholderImage=[ImageInfo( description=u'Null', image_url=u'/images/uploadYourOwn.jpg', level=3, location=i, url=u'https://www.reddit.com/r/dankmemes/',scalewidth=1,scaleheight=1)]
        return placeholderImage

def fetchNearByImages(location,level): 
    img_location=[]
    img_imgurl=[]
    img_level=[]
    img_scalewidth=[]
    img_scaleheight=[]
    if(level==2):
        unitsinY=80
        maxindex=6400
    if(level==3):
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
    for i in list:        
        imagelist.append(getImages(i,level))  

    for i in imagelist:
        img_location.append(i[0].location)
        img_imgurl.append(i[0].image_url)
        img_level.append(i[0].level)
        img_scalewidth.append(i[0].scalewidth)
        img_scaleheight.append(i[0].scaleheight)
    return{
        'img_location':img_location,
        'img_imgurl':img_imgurl,
        'img_level':img_level,
        'img_scaleX': img_scalewidth,
        'img_scaleY': img_scaleheight
    }
    
def getimagesbylocation(passedlist):
    from database import alreadyexist
    img_location=[]
    img_imgurl=[]
    img_level=[]
    img_scalewidth=[]
    img_scaleheight=[]
    list=passedlist
    imagelist=[]
    unitsinY=1200
    maxindex=1440000
    list=[x for x in list if x >= 1]   #filters out out of bround locations
    list=[x for x in list if x <= maxindex] #filters out out of bround locations
        # print(list)
    for i in list:        
        imagelist.append(getImages(i,3))  

    for i in imagelist:
        img_location.append(i[0].location)
        img_imgurl.append(i[0].image_url)
        img_level.append(i[0].level)
        img_scalewidth.append(i[0].scalewidth)
        img_scaleheight.append(i[0].scaleheight)
    return{
        'img_location':img_location,
        'img_imgurl':img_imgurl,
        'img_level':img_level,
        'img_scaleX': img_scalewidth,
        'img_scaleY': img_scaleheight,
        'bool':alreadyexist(passedlist)
    }




def getImageInfo(location):
    #for when user click on an image
    imageExist=ImageInfo.query(ImageInfo.location==location,ImageInfo.level==3).fetch()
    if imageExist:
         return imageExist
    else:
        placeholderImage=[ImageInfo( description=u'Upload your own today!', image_url=u'/images/uploadYourOwn.jpg', location=location, url=u'https://www.reddit.com/r/dankmemes/')]
        return placeholderImage
    
  


