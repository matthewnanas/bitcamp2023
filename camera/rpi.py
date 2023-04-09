import cv2
from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from msrest.authentication import ApiKeyCredentials
import base64
import requests

# Create variables for your project
publish_iteration_name = "Iteration11"
project_id = "3277afc2-09d2-4b0d-92cf-171a689cd9c0"
# Create variables for your prediction resource
prediction_key = "88a65ef485474c4892ca7f0d52df2fb8"
endpoint = "https://southcentralus.api.cognitive.microsoft.com/"
prediction_credentials = ApiKeyCredentials(in_headers={"Prediction-key": prediction_key})
predictor = CustomVisionPredictionClient(endpoint, prediction_credentials)

def livefeed():
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
    frameLimit = 60
    count = 0
    snapCounter = 0

    while True:
        ret, img = cam.read()

        if not ret:
            break
        
        count += 1
        if count % frameLimit == 0:
            snapCounter += 1
            #filename = 'capture' + str(snapCounter) + '.png'
            frame = img
            cv2.imwrite('capture.png', frame)

            findWeapons('capture.png', frame)

        cv2.imshow('Feed', img)

        if cv2.waitKey(1) == 27: 
            break
    cv2.destroyAllWindows()

def findWeapons(captureName, image):
    with open(captureName, mode="rb") as captured_image:
        results = predictor.detect_image(project_id, publish_iteration_name, captured_image)
        color = (0,255,0)
        for prediction in results.predictions:
            if prediction.probability > 0.90:
                left = prediction.bounding_box.left * 640
                top = prediction.bounding_box.top * 480
                height = prediction.bounding_box.height * 480
                width =  prediction.bounding_box.width * 640
                result_image = cv2.rectangle(image, (int(left), int(top)), (int(left + width), int(top + height)), color, 3)
                cv2.putText(result_image, f"{prediction.probability * 100 :.2f}%", (int(left), int(top)-10), fontFace = cv2.FONT_HERSHEY_SIMPLEX, fontScale = 0.7, color = color, thickness = 2)
                cv2.imwrite('result.png', result_image)
                trigger()

def trigger():
    with open("result.png", "rb") as image:
        response = requests.post(
            'https://api.imgbb.com/1/upload',
            params={'key': 'b8c09a719f0fcd5cc5f96adf473893a4'},
            files={'image': image}
        )

        parsed = response.json()

        print("Status Code", response.status_code)
        print("URL ", parsed["data"]["display_url"])

        # post this to express
        payload = {
            "time": parsed["data"]["time"],
            "image": parsed["data"]["display_url"],
            "location": "20740",
            "message": "Incident detected @ 20740"
            "admin_email": ""
        }

def main():
    livefeed()

if __name__ == '__main__':
    main()