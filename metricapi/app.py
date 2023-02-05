from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from PIL import Image
import os
import numpy as np
import cv2
import pyrebase
app = Flask(_name_)

folder ="fingerprint"

firebase=pyrebase.initialize_app(firebaseConfig)
storage=firebase.storage()



@app.route('/')
def apiservice():
    return jsonify({'Status': "Service Started"})



@app.route('/matchFingerPrint', methods=['POST'])

def getFingerPrint():
    imfile = request.files['image']
    
    filename = secure_filename(imfile.filename)
    tempName = filename
    figimg = imfile.save(filename)

    score = []
    fileid = []
    status = "Notfound"
   
    sample_Fingeprint = cv2.imread(tempName)


    for image in os.listdir(folder):

     storage.child(tempName).put(file)

#get url of the file we just uploaded
     print(storage.child(tempName).get_url(None))

#download a file
     storage.child(tempName).download("downloaded.txt")


#to read from the file
    path=storage.child(tempName).get_url(None)
    f = urllib.request.urlopen(path).read()




        db_Fingerprint = cv2.imread("fingerprint/"+image)
        # print(image)
        sift = cv2.SIFT_create()
        keypoints_1, descriptors_1 = sift.detectAndCompute(sample_Fingeprint, None)
        keypoints_2, descriptors_2 = sift.detectAndCompute(db_Fingerprint, None)

        matches = cv2.FlannBasedMatcher(dict(algorithm=1, trees=10), 
             dict()).knnMatch(descriptors_1, descriptors_2, k=2)
        match_points = []

        for p, q in matches:
           if p.distance < 0.1*q.distance:
             match_points.append(p)

        keypoints = 0

        if len(keypoints_1) <= len(keypoints_2):
             keypoints = len(keypoints_1)

        else:
          keypoints = len(keypoints_2)    

        if (len(match_points) / keypoints)>0.50:
          print("% match: ", len(match_points) / keypoints * 100)
          acc = len(match_points) / keypoints * 100
          print(image)
          score.append(acc)
          fileid.append(image)
          status = "Fingerprint Match Found"





    return jsonify({'Status': status},{'result':[score, fileid]})




if _name_ == "_main_":
    app.run(debug=True)


