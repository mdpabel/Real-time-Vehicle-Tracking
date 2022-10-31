#include <Arduino.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ArduinoJson.h>
#include <SocketIoClient.h>
#include <Hash.h>

#define USE_SERIAL Serial

ESP8266WiFiMulti WiFiMulti;
SocketIoClient webSocket;

TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5); //TX RX

float Latitude , Longitude, deg;
int year , month , date, hour , minute , second;
String DateString , TimeString , LatitudeString , LongitudeString, speedkmph, rotate;


void event(const char * payload, size_t length) {
  USE_SERIAL.printf("got message: %s\n", payload);
}

void setup() {
    USE_SERIAL.begin(115200);
    SerialGPS.begin(9600);
    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

      for(uint8_t t = 4; t > 0; t--) {
          USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
          USE_SERIAL.flush();
          delay(1000);
      }

    WiFiMulti.addAP("wifiname", "pass");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    String ip = WiFi.localIP().toString();
    USE_SERIAL.printf("[SETUP] WiFi Connected %s\n", ip.c_str());

    webSocket.on("test", event);
    

    // server
    webSocket.begin("mdpabe-vehicle-tracking-server.herokuapp.com");
    // use HTTP Basic Authorization this is optional remove if not needed
    // webSocket.setAuthorization("username", "password");
}

unsigned long messageTimestamp = 0;
bool send_data=false;
bool test_1=false;

void loop() {
    webSocket.loop();

    while (SerialGPS.available() > 0)
    if (gps.encode(SerialGPS.read()))
    {
      if (gps.location.isValid())
      {
        Latitude = gps.location.lat();
        LatitudeString = String(Latitude , 6);
        Longitude = gps.location.lng();
        LongitudeString = String(Longitude , 6);
      }

      if (gps.date.isValid())
      {
        DateString = "";
        date = gps.date.day();
        month = gps.date.month();
        year = gps.date.year();

        if (date < 10)
        DateString = '0';
        DateString += String(date);

        DateString += " : ";

        if (month < 10)
        DateString += '0';
        DateString += String(month);
        DateString += " : ";

        if (year < 10)
        DateString += '0';
        DateString += String(year);
      }

      if (gps.time.isValid())
      {
        TimeString = "";
        hour = gps.time.hour()+ 5; //adjust time 
        minute = gps.time.minute();
        second = gps.time.second();
    
        if (hour < 10)
        TimeString = '0';
        TimeString += String(hour);
        TimeString += " : ";

        if (minute < 10)
        TimeString += '0';
        TimeString += String(minute);
        TimeString += " : ";

        if (second < 10)
        TimeString += '0';
        TimeString += String(second);
      }

    }

    if(gps.course.isValid()) {
      deg = gps.course.deg();
      rotate = String(deg);
    }

  if (gps.speed.isValid())
  { speedkmph = "";
 speedkmph +=String(gps.speed.kmph());
}
if(gps.location.isValid())
{
  send_data=true;
  }
  else
  {
  send_data=false;
  }
  if(test_1 &&!send_data )
  {
    send_data=true;
    DateString="22/06/22";
    TimeString="08:57";
    LatitudeString="11225566.256655";
    LongitudeString="2155993325.2563";
    speedkmph="60";
    }
//this loop executes only if gps have a valid data 
  if (millis()- messageTimestamp > 2000 && send_data ) { // 1000 means one second delay
    messageTimestamp =millis();

    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    // add evnet name
    // Hint: socket.on('event_name', ....
    array.add("gpsdata");

    // add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();
    //DateString , TimeString , LatitudeString , LongitudeString,speedkmph;
    param1["busId"] = "bus_02";
    param1["date"] = DateString; //(uint32_t) now;
    param1["time"] = TimeString; // i dont thunk this is the way .. but any way let's chek ok
    param1["lattitude"] = LatitudeString;
    param1["longitude"] =  LongitudeString;
    param1["speed"] = speedkmph;
    param1["direction"] = rotate;
   
    
    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);

    // Send event
    webSocket.emit("gpsdata", output.c_str());

    // Print JSON for debugging
    USE_SERIAL.println(output);
  }
}
