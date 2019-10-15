from Images import ImageInfo, ANCESTORY_KEY

def defaultdatas():
        a=0
        a=ImageInfo.query(ImageInfo.scaleAmount==8).fetch(2)
        if not a:
            for i in range(1,65):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=8).put()
            for i in range(1,17):
                ImageInfo(parent=ANCESTORY_KEY,location=i,scaleAmount=4).put()

                
