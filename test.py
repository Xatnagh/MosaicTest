from Images import ImageInfo
arr =[]
def test():
    var = ImageInfo.query(ImageInfo.level==2,ImageInfo.location>4000).order().fetch()
    
    print(var)
        