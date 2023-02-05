


from flask import Blueprint, request
import os
import cv2
from werkzeug.utils import secure_filename
import service

blueprint = Blueprint("routes", __name__)
folder = "facedataset"

@blueprint.route("/")
def home():
    return "<h1>Welcome to DeepFace API!</h1>"


@blueprint.route("/represent", methods=["POST"])
def represent():
    input_args = request.get_json()

    if input_args is None:
        return {"message": "empty input set passed"}

    img_path = input_args.get("img")
    if img_path is None:
        return {"message": "you must pass img_path input"}

    model_name = input_args.get("model_name", "VGG-Face")
    detector_backend = input_args.get("detector_backend", "opencv")
    enforce_detection = input_args.get("enforce_detection", True)
    align = input_args.get("align", True)

    obj = service.represent(
        img_path=img_path,
        model_name=model_name,
        detector_backend=detector_backend,
        enforce_detection=enforce_detection,
        align=align,
    )

    return obj


@blueprint.route("/verify", methods=["POST"])
def verify():
    img1_path = request.files["img1_path"]
    filename1 = secure_filename(img1_path.filename)
    tempfile1 = filename1 
    tempimg1= img1_path.save(filename1 )
    print(img1_path)



    # img2_path = request.files["img2_path"]
    # filename2= secure_filename(img2_path.filename)
    # tempfile2 = filename2
    # tempimg2= img2_path.save(filename2)
    # print(img2_path)
    





    # img1_path = input_args.get("img1_path")
    # img2_path = input_args.get("img2_path")

    if img1_path is None:
        return {"message": "you must pass img1_path input"}

    # if img2_path is None:
    #     return {"message": "you must pass img2_path input"}

    # model_name = input_args.get("model_name", "VGG-Face")
    # detector_backend = input_args.get("detector_backend", "opencv")
    # enforce_detection = input_args.get("enforce_detection", True)
    # distance_metric = input_args.get("distance_metric", "cosine")
    # align = input_args.get("align", True)

    
    for image in os.listdir(folder):
        tempImge="facedataset/"+image
        verification = service.verify(
        img1_path=tempfile1 ,
        img2_path=tempImge ,
        model_name="VGG-Face",
        detector_backend="opencv",
        distance_metric="cosine",
        align=True,
        enforce_detection=True,
        
    )

    # verification["verified"] = str(verification["verified"])
    


    service.similarity_result= {}

    return verification

    




@blueprint.route("/analyze", methods=["POST"])
def analyze():
    input_args = request.get_json()

    if input_args is None:
        return {"message": "empty input set passed"}

    img_path = input_args.get("img_path")
    if img_path is None:
        return {"message": "you must pass img_path input"}

    detector_backend = input_args.get("detector_backend", "opencv")
    enforce_detection = input_args.get("enforce_detection", True)
    align = input_args.get("align", True)
    actions = input_args.get("actions", ["age", "gender", "emotion", "race"])

    demographies = service.analyze(
        img_path=img_path,
        actions=actions,
        detector_backend=detector_backend,
        enforce_detection=enforce_detection,
        align=align,
    )

    return demographies
