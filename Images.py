from google.appengine.ext import ndb
from google.appengine.api import images
import math

 
class ImageInfo(ndb.Model):
    location=ndb.IntegerProperty(required=True)
    level=ndb.IntegerProperty(required=True)
    image_url= ndb.StringProperty(required=False) #for url
    imageblob= ndb.BlobProperty(required=False) #for base64 data
    url= ndb.StringProperty(required=False)
    description=ndb.TextProperty(required=False)
    scalewidth= ndb.IntegerProperty(required=False)
    scaleheight= ndb.IntegerProperty(required=False)
    pointer=ndb.BooleanProperty(required=False,default=False)
    pointerlocation=ndb.IntegerProperty(required=False)
    pointerlist=ndb.IntegerProperty(required=False,repeated=True)


ANCESTORY_KEY = ndb.Key("ImageInfo","ImageInfo_root")
def getImages(list,level):
    imagelist=[]
    if level==2:
        for i in list:
            placeholderImage=[ImageInfo( description=u'Null', image_url=u'images/placeholder2.jpeg', level=2, location=i,scalewidth=1,scaleheight=1)]
            imagelist.append (placeholderImage)
    if level==3:
        for i in list:
            ImageExist=ImageInfo.query(ImageInfo.level==level,ImageInfo.location==i).fetch()
            if ImageExist:
                if(ImageExist[0].pointer==False):
                    imagelist.append(ImageExist) 
                else:
                    pointerImage=ImageInfo.query(ImageInfo.location==ImageExist[0].pointerlocation,ImageInfo.level==3).fetch()
                    print(pointerImage)
                    imagelist.append(pointerImage)
            else:
                placeholderImage=[ImageInfo( description=u'Null', image_url=u'/images/uploadYourOwn.jpg', level=3, location=i, url=u'https://www.reddit.com/r/dankmemes/',scalewidth=1,scaleheight=1)]
                imagelist.append (placeholderImage) 
    return imagelist
def getimagesbylocation(list,level):
    from database import alreadyexist
    img_location=[]
    img_imgurl=[]
    img_level=[]
    img_scalewidth=[]
    img_scaleheight=[]
    imagelist=[]
    list=[x for x in list if x >= 1]   #filters out out of bround locations
    list=[x for x in list if x <= 1440000] #filters out out of bround locations
        # print(list)
          
    imagelist=getImages(list,level)
    if len(imagelist)!=0:
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
        'bool':alreadyexist(list)
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
        placeholderImage=[ImageInfo( description=u'Upload your own today!', image_url=u'/images/uploadYourOwn.jpg', location=location, url=u'https://www.reddit.com/r/dankmemes/')]
        return placeholderImage
    
  


