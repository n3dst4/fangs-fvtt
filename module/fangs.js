
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
  // $("html").css("font-size", "18px");
});

Hooks.on("renderActorSheet", (app, html, data) => {
  html.find("[data-roll-attribute=\"attune\"]").html("Awareness");
  const img = html.find("#name-alias > img");
  const src = img.attr("src");
  img.remove();
  const newDiv = $('<div id="portrait"/>');
  newDiv.css("background-image", `url(${src})`);
  html.find("#name-alias").prepend(newDiv);
  newDiv.on("click", () => {
    new FilePicker({
      type: "image",
      callback: (path) => {
        app.actor.update({img: path});
        // game.settings.set(moduleName, customPathKey, path);
        // newDiv.css("background-image", `url(${path})`);
      },
      top: app.position.top + 40,
      left: app.position.left + 10,
    }).browse(src);
    // new ImagePopout(src, {
    //   title: data.name,
    //   shareable: true,
    //   uuid: data.uuid
    // }).render(true);
  });
});
