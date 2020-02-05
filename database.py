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
                ImageInfo(parent=ANCESTORY_KEY,location=i,level=1,image_url='images/placeholder.jpg').put()          
        b=ImageInfo.query(ImageInfo.level==3).fetch(1) 
        if not b:
            ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=False,pointerlist=[1,2,1201,1202],image_url='/images/test.jpg',scalewidth=2,scaleheight=2,description='this is a test image',layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=2,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1201,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            ImageInfo(parent=ANCESTORY_KEY,location=1202,level=3,pointer=True,pointerlocation=1,layer2location=1).put()
            # ImageInfo(parent=ANCESTORY_KEY,location=1,level=2,layer1location=1,image_url='/images/test.jpg',scalewidth=1,scaleheight=1).put()

def alreadyexist(locationlist,upperlayerlist):  
    load=False 
    for i in upperlayerlist:
        image=ImageInfo.query(ImageInfo.layer2location==i).fetch()
        for j in image:
            location=j.location
            if location in locationlist:
                load=True
                return load
    return load   
def loadtest():
    for i in range(1):
                ImageInfo(parent=ANCESTORY_KEY,location=1,level=3,pointer=True,pointerlist=[1,2,1201,1202],image_url='/images/test.jpg',scalewidth=2,scaleheight=2).put()
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

        if len(locationlist)>1:
            layer2spot=int(getupperlayeroflocation(pointerlocation1))
            ImageInfo(parent=ANCESTORY_KEY,image_url=image,location=pointerlocation1,level=3,pointer=False,pointerlist=locationlist,scalewidth=width,scaleheight=height,layer2location=layer2spot,description=descriptionsendin).put_async()
            for i in range(1,len(locationlist)):
                layer2spot=int(getupperlayeroflocation(locationlist[i]))
                ImageInfo(parent=ANCESTORY_KEY,location=locationlist[i],level=3,pointer=True,pointerlocation=pointerlocation1,layer2location=layer2spot).put_async()

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
    x=math.floor(location/15.000001)%80+1
    y=math.floor(location/15.000001/1200)
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
    x=math.floor(bottomleft/15.000001)%80+1
    y=math.floor(bottomleft/15.000001/1200)
    location=x+y*80
    secondx=math.floor(topright/15.000001)%80+1
    secondy=math.floor(topright/15.000001/1200)
    width=int(secondx-x+1)
    height=int(secondy-y+1)
    
    for i in range(0,width):
        for j in range(0,height):
            layer2.append(int(location+i+j*80))
    print('layer2',layer2)
    return layer2



    # for(i=0;i<width;i++){
    # for(j=0;j<height;j++){
    #     layer2.push(location+i+j*80)
    # }
    # }
    # //for layer1
    # x=math.floor(layer2[0]/5.000001)%16+1
    # y=math.floor(layer2[0]/5.000001/80)
    # location=x+y*16
    # secondx=math.floor(layer2[layer2.length-1]/5.000001)%16+1
    # secondy=math.floor(layer2[layer2.length-1]/5.000001/80)
    # width=secondx-x+1;
    # height=secondy-y+1;
    # for(i=0;i<width;i++){
    # for(j=0;j<height;j++){
    #     layer1.push(location+i+j*16)
    # }
    # }
    # console.log('layer2',layer2)
    # console.log('layer1',layer1)

