const moduleName = "louder-whispers";
const no = "No";
const yesTemp = "Yes (temporary)";
const yesPerm = "Yes (permanent until dismissed)";
const showWhisperNotificationsKey = "showWhisperNotifications";
const overrideAudioKey = "overrideAudioKey";
const enhanceMessageKey = "enhanceMessage";
const customPathKey = "customPath";
const notifChoices = [no, yesTemp, yesPerm];

Hooks.once("init", async function () {});

Hooks.once("ready", () => {});

Hooks.on("renderActorSheet", (app, html, data) => {
  // html.find('[data-roll-attribute="attune"]').html("Analyze");
  const img = html.find("#name-alias > img");
  const src = img.attr("src");
  img.remove();
  const portraitDiv = $('<div id="portrait"/>')
    .css("--portrait-image", `url("${getRoute(src)}")`)
    .on("click", () => {
      new FilePicker({
        type: "image",
        callback: (path) => {
          app.actor.update({ img: path });
        },
        top: app.position.top + 40,
        left: app.position.left + 10,
      }).browse(src);
    });
  html.find("#name-alias").prepend(portraitDiv);
});

Hooks.on("createActor", (actor, options, userId) => {
  actor.update({
    system: {
      attributes: {
        resolve: {
          skills: {
            "-=attune": null,
            analyze: {
              label: "Analyze",
              tip: "When you straddle between sub- and hyper-conscious awareness to gain information quickly when faced with threats which might otherwise be overwhelming.",
              value: 1,
              max: 3,
            },
          }
        },
      },
    }
  });
});

