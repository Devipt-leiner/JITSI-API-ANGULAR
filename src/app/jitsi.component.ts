import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements OnInit, AfterViewInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
      private router: Router
  ) { }

  ngOnInit(): void {
      this.user = {
          name: 'Juan Camilo ',
          displayName: 'leiner' // Set your username
      }
      this.room = 'Ekt-12ashjdgajsdhgajsdgasjdyagsjdagsdjasvdaksxdaksydaksydgavsmjdhxgashdagkshjdgvagskdhvagskdg';
  }

  ngAfterViewInit(): void {
      this.options = {
            roomName: this.room,
            width: '100%',
            height: '100%',
            configOverwrite: { 
                prejoinPageEnabled: false,
                remoteVideoMenu: {
                    disableKick: true
                },
                toolbarButtons: [ 'microphone', 'camera', 'raisehand', 'chat', 'hangup',
            //    'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
            //    'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            //    'livestreaming', 'etherpad', 'sharedvideo', 'shareaudio', 'settings', 'raisehand',
            //    'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
            //    'tileview', 'select-background', 'download', 'help', 'mute-everyone', 'mute-video-everyone', 'security'
                ],
            },
            interfaceConfigOverwrite: {
                SHOW_BRAND_WATERMARK: false,
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_POWERED_BY: false,
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.user.name,
                role: 'guest'
            }
        }

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

        // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });

        this.api.executeCommand('toggleRaiseHand');
        this.api.executeCommand('toggleShareScreen');
  }

  handleClose = () => {
    console.log("handleClose");
}

handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/thank-you']);
}

handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}

executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}
}