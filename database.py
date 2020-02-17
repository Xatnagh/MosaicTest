from Images import ImageInfo, ANCESTORY_KEY
import cloudstorage
from google.appengine.api import app_identity
from google.appengine.ext import blobstore
from google.appengine.ext import ndb
import math
def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.level==1).fetch(1)
        if not a:          
            for i in range(1,257):
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=1,image_url='images/placeholder.jpg').put_async()          
        b=ImageInfo.query(ImageInfo.level==3).fetch(1) 
        if not b:
            ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=False,image_url='/images/test.jpg',scalewidth=2,scaleheight=2,description='this is a test image',layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=2,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1201,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1202,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            # ImageInfo(parent=ANCESTORY_KEY,location=1,level=2,layer1location=1,image_url='/images/test.jpg',scalewidth=1,scaleheight=1).put()

def alreadyexist(locationlist,upperlayerlist):  
    image=ImageInfo.query(ImageInfo.layer2location.IN(upperlayerlist)).fetch()
    for j in image:
        location=j.location
        if location in locationlist:
            return True
    return False


def clearlevel2():
    img=ImageInfo.query(ImageInfo.level==2).fetch()
    for i in img:
        i.key.delete()
    img=ImageInfo.query(ImageInfo.level==1).fetch()
    for i in img:
        i.key.delete()
    img=ImageInfo.query(ImageInfo.level==3).fetch()
    for i in img:
        i.key.delete()
    defaultdatas()
    
def putDataintodatabase(pointerlocation1,locationlist,image,descriptionsendin,width,height):
        priorityload=False
        if (width*height>10000): priorityload=True
        if len(locationlist)>1: 
            layer2spot=int(getupperlayeroflocation(pointerlocation1))
            ImageInfo(parent=ANCESTORY_KEY,image_url=image,location=pointerlocation1,level=3,pointer=False,scalewidth=width,scaleheight=height,layer2location=layer2spot,description=descriptionsendin,priorityload=priorityload).put()
            for i in range(1,len(locationlist)):
                layer2spot=int(getupperlayeroflocation(locationlist[i]))
                ImageInfo(parent=ANCESTORY_KEY,location=locationlist[i],level=3,pointer=True,pointerlocation=pointerlocation1,layer2location=layer2spot).put()

import os
cloudstorage.set_default_retry_params(
    cloudstorage.RetryParams(
        initial_delay=0.2, max_delay=5.0, backoff_factor=2, max_retry_period=15
        ))
def upload_file(image,pointerlocation):
    bucket_name ='fortest099.appspot.com'
    pointerlocation=str(pointerlocation)        
    bucket = '/' + bucket_name
    filename = bucket + '/'+pointerlocation
    write_retry_params = cloudstorage.RetryParams(backoff_factor=1.1)
    with cloudstorage.open(
            filename, 'w', content_type='image/png',
            retry_params=write_retry_params) as cloudstorage_file:
                cloudstorage_file.write(image)
    return 'https://storage.googleapis.com/fortest099.appspot.com/{}'.format(pointerlocation)

def putImageIntoDatabase_layer2(image,location):
    location=str(location)
    bucket_name = 'mosaictestlayer2'
    bucket = '/' + bucket_name
    filename = bucket + '/'+location
    write_retry_params = cloudstorage.RetryParams(backoff_factor=1.1)
    with cloudstorage.open(
            filename, 'w', content_type='image/png',
            retry_params=write_retry_params) as cloudstorage_file:
                cloudstorage_file.write(image)
    return 'https://storage.googleapis.com/mosaictestlayer2/{}'.format(location)
def putImageIntoDatabase_layer1(image,location):
    location=str(location)
    bucket_name = 'mosaictestlayer1'
    bucket = '/' + bucket_name
    filename = bucket + '/'+location
    write_retry_params = cloudstorage.RetryParams(backoff_factor=1.1)
    with cloudstorage.open(
            filename, 'w', content_type='image/png',
            retry_params=write_retry_params) as cloudstorage_file:
                cloudstorage_file.write(image)
    return 'https://storage.googleapis.com/mosaictestlayer1/{}'.format(location)

#only used for getting the layer2 location of the image, for faster image load
def getupperlayeroflocation(location):
    x=math.floor((location-1)/15)%80+1
    y=math.floor((location-1)/15/1200)
    layer2=x+y*80
    return layer2
   
def getlocationlist(bottomleft,height,width):
    locationlist=[]
    for i in range(0,height):
        for j in range(bottomleft,bottomleft+width):
            locationlist.append(j+i*1200)
    return locationlist
    
def getupperlayeroflocation_fromlist_layer2(bottomleft,topright):
   
    layer2=[]
    x=math.floor((bottomleft-1)/15%80+1)
    y=math.floor((bottomleft-1)/15/1200)
    location=x+y*80
    secondx=math.floor((topright-1)/15)%80+1
    secondy=math.floor((topright-1)/15/1200)
    width=int(secondx-x+1)
    height=int(secondy-y+1)
    
    for i in range(0,width):
        for j in range(0,height):
            layer2.append(int(location+i+j*80))
    print('layer2',layer2)
    return layer2

