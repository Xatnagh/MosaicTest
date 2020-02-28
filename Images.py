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
    pointer=ndb.BooleanProperty(required=False,default=False)
    pointerlocation=ndb.IntegerProperty(required=False)
    added = ndb.DateTimeProperty(auto_now_add=True)
    layer2location=ndb.IntegerProperty(required=False)
    layer1location=ndb.IntegerProperty(required=False)
    priorityload=ndb.BooleanProperty(required=False,default=False)


ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")

def getImages(locationlist,level):
    imagelist=[]
    alreadyloaded=[]
    if level==2 and locationlist:
        image=ImageInfo.query(ImageInfo.layer2location.IN(locationlist)).fetch()
        for i in image: 
            if i.pointerlocation not in alreadyloaded:
                if(i.pointer==False):
                    imagelist.append(i)
                    alreadyloaded.append(i.location)
                else:
                    pointerimage=ImageInfo.query(ImageInfo.location==i.pointerlocation,ImageInfo.level==3).fetch()
                    imagelist.extend(pointerimage)
                    alreadyloaded.append(i.pointerlocation)  
    if level==1 and locationlist:
        image=ImageInfo.query(ImageInfo.layer1location.IN(locationlist)).fetch()
        imagelist.extend(image)
    return imagelist;  #it is a list of ImageInfo Objects

def getimagesbylocation(list,level,upperlayerlist):
    from database import alreadyexist
    exist=False
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
    if len(upperlayerlist)!=0:
        exist=alreadyexist(list,upperlayerlist)
    return{
        'img_location':img_location,
        'img_imgurl':img_imgurl,
        'img_level':img_level or [level+1],
        'img_scaleX': img_scalewidth,
        'img_scaleY': img_scaleheight,
        'bool':exist
    }




def getImageInfo(location):
    #for when user click on an image
    imageExist=ImageInfo.query(ImageInfo.location==location,ImageInfo.level==3).fetch()
    if imageExist:
        if imageExist[0].pointer==False:
            return imageExist
        else:
            image=ImageInfo.query(ImageInfo.location==imageExist[0].pointerlocation,ImageInfo.level==3).fetch()
            return image
    else:
        placeholderImage=[ImageInfo( description=u'Upload your own today!', image_url=u'/images/uploadYourOwn.jpg', location=location)]
        return placeholderImage
    
  


