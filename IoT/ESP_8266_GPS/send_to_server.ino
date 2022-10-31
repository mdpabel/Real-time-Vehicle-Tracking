void send_to_server()
{

    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      http.begin(client, serverName);
       // Specify content-type header
       http.addHeader("Content-Type", "application/x-www-form-urlencoded");

       httpRequestData="";
       
        httpRequestData+= "bus_02_campus_to_kandirpar";
        httpRequestData+="date=";
        httpRequestData+=DateString;
        httpRequestData+="&time=";
        httpRequestData+= TimeString;
        httpRequestData+="&lat=";
        httpRequestData+=LatitudeString ;
        httpRequestData+="&long=";
        httpRequestData+= LongitudeString ;
        httpRequestData+="&speed=";
        httpRequestData+= speedkmph;
        
        Serial.println( httpRequestData);
        
         //  HTTP POST request
      int httpResponseCode = http.POST(httpRequestData);
      Serial.println(httpResponseCode);
  }
}
