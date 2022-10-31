/*
MD Pabel
****************************
Libraries we nedd to install '
https://github.com/mikalhart/TinyGPSPlus

*/


const char* ssid = "name";
const char* password = "pass";

//our Domain name with URL path or IP address with path
// eg "http://192.14.2.56:1770/update";


const char* serverName = "api end point";


#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>



TinyGPSPlus gps;
SoftwareSerial SerialGPS(4, 5); //TX RX 


float Latitude , Longitude;
int year , month , date, hour , minute , second;
String DateString , TimeString , LatitudeString , LongitudeString,speedkmph;


String httpRequestData;


WiFiServer server(80);
void setup()
{
  Serial.begin(9600);
  SerialGPS.begin(9600);
  Serial.println();
  Serial.print("Connecting");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  server.begin();
  Serial.println("Server started");
  Serial.println(WiFi.localIP());
}

void loop()
{
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
  if (gps.speed.isValid())
{ speedkmph = "";
 speedkmph +=String(gps.speed.kmph());
}
if(gps.location.isValid())
{
  send_to_server();
  }


  delay(100);

}
