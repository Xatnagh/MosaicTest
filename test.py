from Images import ImageInfo
arr =[]
def test():
    var = ImageInfo.query(ImageInfo.level==2 and ImageInfo.location==3).fetch()
    arr.append(var)
    var = ImageInfo.query(ImageInfo.level==2 and ImageInfo.location==4).fetch()
    arr.append(var)
    var = ImageInfo.query(ImageInfo.level==2 and ImageInfo.location==5).fetch()
    arr.append(var)
    var = ImageInfo.query(ImageInfo.level==2 and ImageInfo.location==6).fetch()
    arr.append(var)
    
    for i in arr:
        print(i[0].location)
        print("------------------")
        