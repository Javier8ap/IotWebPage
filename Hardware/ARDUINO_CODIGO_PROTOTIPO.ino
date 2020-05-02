int nodemcu_one = 0;
int nodemcu_two = 0;
float send_val = 0;

void setup() {
  
  pinMode( A0, INPUT ); //TEMPERATURE
  pinMode( A1, INPUT ); //PH
  pinMode( A2, INPUT ); //CONDUCTIVITY
  pinMode( 5, OUTPUT ); //CONDUCTIVITY
  pinMode( 2, INPUT ); //16
  pinMode( 3, INPUT ); //5
  Serial.begin( 115200 );

}

void loop() {

 nodemcu_one = digitalRead( 2 );//16
 nodemcu_two = digitalRead( 3 );//5

 Serial.print(nodemcu_one);
 Serial.println(nodemcu_two);

 if( ( nodemcu_one == 1 ) && ( nodemcu_two == 1 ) )//temperatura
 {
  send_val = analogRead( A0 );
 }

  if( ( nodemcu_one == 0 ) && ( nodemcu_two == 1 ) )//ph
 {
  send_val = analogRead( A1 );
 }

  if( ( nodemcu_one == 1 ) && ( nodemcu_two == 0 ) )//salinidad
 {
  send_val = analogRead( A2 );
 }

   if( ( nodemcu_one == 0 ) && ( nodemcu_two == 0 ) )
 {
    send_val = 0;
 }

 send_val = send_val / 4;
 Serial.println( send_val );
 analogWrite( 5, send_val );

}
