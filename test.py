from Images import ImageInfo
arr =[]
def test():
    var = ImageInfo.query(ImageInfo.level==2,ImageInfo.location==4).fetch()
    
    print(var)
        