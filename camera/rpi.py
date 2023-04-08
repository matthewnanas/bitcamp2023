import cv2

def livefeed():
    cam = cv2.VideoCapture(0)
    while True:
        ret_val, img = cam.read()
        cv2.imshow('Feed', img)

        if cv2.waitKey(1) == 27: 
            break
    cv2.destroyAllWindows()

def main():
    livefeed()

if __name__ == '__main__':
    main()