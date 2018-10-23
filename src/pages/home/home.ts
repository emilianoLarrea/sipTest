import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import *  as JsSIP from 'jssip';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    var remoteAudio = window.document.createElement('audio');
window.document.body.appendChild(remoteAudio);
    console.log ("STARTING JSSIP");
  	JsSIP.debug.enable('JsSIP:*');
    var socket = new JsSIP.WebSocketInterface('ws:35.188.255.171:5060'); // change to your url
	var configuration = {
    sockets  : [ socket ],
    uri: "sip:5251@35.188.255.171",
    password : 'PROline.201018!',
        display_name: "5251",
        authorization_user: '5251',
        register: null,
        register_expires: null,
        no_answer_timeout: null,
        trace_sip: true,
        stun_servers: null,
        turn_servers: null,
        use_preloaded_route: null,
        connection_recovery_min_interval: null,
        connection_recovery_max_interval: null,
        hack_via_tcp: null,
        hack_ip_in_contact: true
	};

var myPhone = new JsSIP.UA(configuration);
myPhone.start();

var eventH = {
  'progress': function (e) { },
  'failed': function (e) { },
  'ended': function (e) { },
  'confirmed': function (e) {},
  'addstream': function (e) {}
};

var options = {
  'eventHandlers': eventH,
  'mediaConstraints': {
      'audio': true,
      'video': false
  }};
  myPhone.on('connected', function(e){
    console.log("CONECTADO"+e);
  });
  myPhone.on('disconnected', function(e){
    console.log("DESCONECTADO"+e);
  });
 //myPhone.call('sip:5250@35.188.255.171', options);
  //myPhone.sendMessage('sip:5250@35.188.255.171', 'Hola');

}}
