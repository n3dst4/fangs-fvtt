
const moduleName = "louder-whispers";
const no = "No";
const yesTemp = "Yes (temporary)";
const yesPerm = "Yes (permanent until dismissed)";
const showWhisperNotificationsKey = "showWhisperNotifications" ;
const overrideAudioKey = "overrideAudioKey";
const enhanceMessageKey = "enhanceMessage";
const customPathKey = "customPath"
const notifChoices = [no, yesTemp, yesPerm];

Hooks.once("init", async function () {
});

Hooks.once("ready", () => {
});

Hooks.on("renderActorSheet", (app, html, data) => {
  html.find("[data-roll-attribute=\"attune\"]").html("Awareness");
});
