from google.appengine.ext import ndb
from google.appengine.api import images
import math

   
class ImageInfo(ndb.Model):
    location=ndb.IntegerProperty(required=True)
    level=ndb.IntegerProperty(required=True)
    image_url= ndb.StringProperty(required=False) #for url
    description=ndb.TextProperty(required=False)
    scalewidth= ndb.IntegerProperty(required=False,default=1)
    scaleheight= ndb.IntegerProperty(required=False,default=1)
    added = ndb.DateTimeProperty(auto_now_add=True)
    layer2location=ndb.IntegerProperty(required=False,repeated=True)
    layer1location=ndb.IntegerProperty(required=False)
    priorityload=ndb.BooleanProperty(required=False,default=False)
    leftX=ndb.IntegerProperty(required=False)
    rightX=ndb.IntegerProperty(required=False)
    topY=ndb.IntegerProperty(required=False)
    bottomY=ndb.IntegerProperty(required=False)



ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")

def getImages(locationlist,level):
    imagelist=[]
    if level==2 and locationlist:
        image=ImageInfo.query(ImageInfo.layer2location.IN(locationlist)).fetch()
        imagelist.extend(image)
    if level==1 and locationlist:
        image=ImageInfo.query(ImageInfo.layer1location.IN(locationlist)).fetch()
        imagelist.extend(image)
    return imagelist;  #it is a list of ImageInfo Objects

def getimagesbylocation(list,level,upperlayerlist):
    img_location=[]
    img_imgurl=[]
    img_level=[]
    img_scalewidth=[]
    img_scaleheight=[]
    imagelist=getImages(list,level)
    if len(imagelist)!=0:
        for i in imagelist:
            img_location.append(i.location)
            img_imgurl.append(i.image_url)
            img_scalewidth.append(i.scalewidth)
            img_scaleheight.append(i.scaleheight)
            img_level.append(i.level)
    return{
        'img_location':img_location,
        'img_imgurl':img_imgurl,
        'img_level':img_level or [level+1],
        'img_scaleX': img_scalewidth,
        'img_scaleY': img_scaleheight,
    }




def getImageInfo(location): #need to add the check x and y thing, cus rn, the image will show up even if you didn't click it
    from database import getupperlayeroflocation
    #for when user click on an image
    upperlocation=getupperlayeroflocation(location)
    imageExist=ImageInfo.query(ImageInfo.layer2location==upperlocation,ImageInfo.level==3).fetch()
    if not imageExist:
            placeholderImage=[ImageInfo( description=u'Upload your own today!', image_url=u'/images/uploadYourOwn.jpg', location=location)]
            return placeholderImage
    if len(imageExist)==1:
        return imageExist
    
    
    
    
  


