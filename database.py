from Images import ImageInfo, ANCESTORY_KEY
import cloudstorage
from google.appengine.api import app_identity
from google.appengine.ext import blobstore
from google.appengine.ext import ndb
def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.level==1).fetch(1)
        if not a:          
            for i in range(1,257):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=1,image_url='images/placeholder.jpg').put()
            for i in range(1,20):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=2,image_url='images/placeholder.jpg').put()
                print('done for 1')   
        b=ImageInfo.query(ImageInfo.level==3).fetch(1) 
        if not b:
            ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=False,pointerlist=[1,2,1201,1202],image_url='/images/test.jpg',scalewidth=2,scaleheight=2).put()
            ImageInfo(parent=ANCESTORY_KEY,location=2,level=3,pointer=True,pointerlocation=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1201,level=3,pointer=True,pointerlocation=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1202,level=3,pointer=True,pointerlocation=1).put()

def alreadyexist(list):  
    load=False 
    for i in list:
        imageexist= ImageInfo.query(ImageInfo.location==i, ImageInfo.level==3).fetch()
        if imageexist:
            load=True
    return load   
def loadtest():
    print('test done')
    for i in range(1):
                ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=True,pointerlist=[1,2,1201,1202],image_url='/images/test.jpg',scalewidth=2,scaleheight=2).put()
def clearlevel2():
    img=ImageInfo.query(ImageInfo.level==2).fetch()
    for i in img:
        i.key.delete()
    result=ImageInfo.query(ImageInfo.level==2).fetch()
    print('test:',result)
    
def putDataintodatabase(pointerlocation,locationlist,image,descriptionsendin,urlsentin,width,height):
        pointerlocation1=int(pointerlocation)
        if len(locationlist)>1:
            ImageInfo(parent=ANCESTORY_KEY,image_url=image,location=pointerlocation1,level=3,pointer=False,pointerlist=locationlist,scalewidth=width,scaleheight=height).put()
            for i in range(1,len(locationlist)):
                ImageInfo(parent=ANCESTORY_KEY,location=int(i),level=3,pointer=True,pointerlocation=pointerlocation1).put()

import os
cloudstorage.set_default_retry_params(
    cloudstorage.RetryParams(
        initial_delay=0.2, max_delay=5.0, backoff_factor=2, max_retry_period=15
        ))
def upload_file(image,pointerlocation):
    bucket_name = os.environ.get(
            'mosaictest', app_identity.get_default_gcs_bucket_name())
    bucket = '/' + bucket_name
    filename = bucket + '/'+pointerlocation
    write_retry_params = cloudstorage.RetryParams(backoff_factor=1.1)
    with cloudstorage.open(
            filename, 'w', content_type='image/png',
            retry_params=write_retry_params) as cloudstorage_file:
                cloudstorage_file.write(image)
    return 'https://storage.cloud.google.com/fortest098.appspot.com/{}'.format(pointerlocation)