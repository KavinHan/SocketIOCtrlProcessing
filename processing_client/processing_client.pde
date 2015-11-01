import processing.net.*; 

Client myClient; 
int dataIn; 
 
void setup() { 
  size(200, 200); 
  // Connect to the local machine at port 5204.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1",8090); 
} 
 
void draw() { 
  if (myClient.available() > 0) { 
    int dataIn = myClient.read();
    println("ascii code:" + dataIn);
    // change ascii int to char: 49 -> '1'
    char charNum = (char)dataIn;
    // change char to int: '1' -> 1
    int num = Character.getNumericValue(charNum);
    switch(num) {
      case 0:
        background(0);
        break;
      case 1:
        background(100);
        break;
      case 2:
        background(150);
        break;
      case 3:
        background(200);
        break;
      default:
        background(255);
        break;
    }
  }
} 

