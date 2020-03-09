from Images import ImageInfo, ANCESTORY_KEY
import cloudstorage
from google.appengine.api import app_identity
from google.appengine.ext import blobstore
from google.appengine.ext import ndb
from google.appengine.ext import db
import math
import json
import time
mosaicLength=1200

def checkavaliablity(location,width,height,upperlocationlist):
    s=time.time()
    image=ImageInfo.query(ImageInfo.layer2location>=upperlocationlist[0],ImageInfo.layer2location<=upperlocationlist[-1], ImageInfo.layer2location.IN(upperlocationlist)).fetch()
    e=time.time()
    print(e-s)
    rec1=corner_coord_of_image(location,width,height)
    for i in image:
        avaliable= overlappingRectangles(rec1,i)
        if avaliable:
            return False
    return True
    
def defaultdatas():
    a=ImageInfo.query(ImageInfo.level==1).fetch(1)
    if not a:
        for i in range(1,257):
            ImageInfo(parent=ANCESTORY_KEY,location=i,level=1,image_url='images/placeholder.jpg').put_async()    
    b=ImageInfo.query(ImageInfo.level==3).fetch(1) 
    if not b:
        putDataintodatabase(1,'/images/test.jpg',"this is a test beep beep beep",2,2)


def clearentiredatabase():
    image=ImageInfo.query().fetch(500)
    if image:
        for img in image:
            img.key.delete()
        return 1
    return 0 #will return 0 if there are no images left
    
def putDataintodatabase(imagelocation,image,descriptionsendin,width,height):
        priorityload=False
        cordinates=corner_coord_of_image(imagelocation,width,height)
        if (width*height>10000): priorityload=True
        layer2spot=getupperlayeroflocation_fromlist_layer2(imagelocation,width,height)
        image=ImageInfo(parent=ANCESTORY_KEY,image_url=image,location=int(imagelocation),level=3,scalewidth=width,scaleheight=height,layer2location=layer2spot,
        description=descriptionsendin,priorityload=priorityload,
        leftX=cordinates['x1'],
        rightX=cordinates['x2'],
        topY=cordinates['y1'],
        bottomY=cordinates['y2']
        )
        image.put()

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
    layer2=int(x+y*80)
    return layer2
   
def getlocationlist(bottomleft,height,width):
    locationlist=[]
    for i in range(0,height):
        for j in range(bottomleft,bottomleft+width):
            locationlist.append(j+i*1200)
    return locationlist
    
def getupperlayeroflocation_fromlist_layer2(bottomleft,width,height):
    topright=bottomleft+width+(height*1200)
    layer2=[]
    x=math.floor((bottomleft-1)/15%80+1)
    y=math.floor((bottomleft-1)/15/1200)
    location=x+y*80
    secondx=math.floor((topright-1)/15%80+1)
    secondy=math.floor((topright-1)/15/1200)
    width=int(secondx-x+1)
    height=int(secondy-y+1)

    for i in range(0,width):
        for j in range(0,height):
            layer2.append(int(location+i+j*80))

    return layer2

def corner_coord_of_image(location,width,height):
    x1=(location-1)%mosaicLength+1
    y1=int(math.floor(location-1)/mosaicLength+1)
    x2=x1+width-1
    y2=y1+height-1
    print('dasidhj',y1)
    # print('x1',x1)
    # print('x2',x2)
    # print('y1',y1)
    # print('y2',y2)
    return{
        'x1':x1,
        'y1':y1,
        'x2':x2,
        'y2':y2
    }
    
def overlappingRectangles(rec1,rec2):
    print('x1',rec1['x1'])
    print('x2',rec1['x2'])
    print('y1',rec1['y1'])
    print('y2',rec1['y2'])
    print('images x1', rec2.leftX)
    print('images x2', rec2.rightX)
    print('images y1', rec2.topY)
    print('images y2', rec2.bottomY)
    
    if(rec1['x1']>rec2.rightX or rec1['x2']<rec2.leftX or rec1['y1']>rec2.bottomY or rec1['y2']<rec2.topY):
         return False
    return True