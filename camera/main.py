import cv2
from azure.cognitiveservices.vision.customvision.prediction import CustomVisionPredictionClient
from msrest.authentication import ApiKeyCredentials
# Create variables for your project
publish_iteration_name = "Iteration11"
project_id = "3277afc2-09d2-4b0d-92cf-171a689cd9c0"
# Create variables for your prediction resource
prediction_key = "88a65ef485474c4892ca7f0d52df2fb8"
endpoint = "https://southcentralus.api.cognitive.microsoft.com/"
prediction_credentials = ApiKeyCredentials(in_headers={"Prediction-key": prediction_key})
predictor = CustomVisionPredictionClient(endpoint, prediction_credentials)
camera = cv2.VideoCapture(1, cv2.CAP_DSHOW)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
ret, image = camera.read()
cv2.imwrite('capture.png', image)
with open("capture.png", mode="rb") as captured_image:
    results = predictor.detect_image(project_id, publish_iteration_name, captured_image)
# Select color for the bounding box
color = (0,255,0)
# Display the results
print("test 1")
for prediction in results.predictions:
    print("test 2")
    if prediction.probability > 0.92:
        print("test 3")
        left = prediction.bounding_box.left * 640
        top = prediction.bounding_box.top * 480
        height = prediction.bounding_box.height * 480
        width =  prediction.bounding_box.width * 640
        result_image = cv2.rectangle(image, (int(left), int(top)), (int(left + width), int(top + height)), color, 3)
        cv2.putText(result_image, f"{prediction.probability * 100 :.2f}%", (int(left), int(top)-10), fontFace = cv2.FONT_HERSHEY_SIMPLEX, fontScale = 0.7, color = color, thickness = 2)
        cv2.imwrite('result.png', result_image)
camera.release()