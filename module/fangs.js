const moduleName = "louder-whispers";
const no = "No";
const yesTemp = "Yes (temporary)";
const yesPerm = "Yes (permanent until dismissed)";
const showWhisperNotificationsKey = "showWhisperNotifications";
const overrideAudioKey = "overrideAudioKey";
const enhanceMessageKey = "enhanceMessage";
const customPathKey = "customPath";
const notifChoices = [no, yesTemp, yesPerm];

const analyzeTip = "When you straddle between sub- and hyper-consciousness to gain information quickly about threats which might otherwise be overwhelming.";

Hooks.once("init", async function () {});

Hooks.once("ready", () => {
  // fix the template data
  delete game.system.model.Actor.character.attributes.resolve.skills.attune 
  game.system.model.Actor.character.attributes.resolve.skills.analyze = {
    "label": "Analyze",
    "tip": analyzeTip,
    "value": [
      0
    ],
    "max": 3
  }
});

Hooks.on("renderActorSheet", (app, html, data) => {
  // replace the portrait img with a div, so it can use background image logic
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
  // we have analyze, not attune, so fix this inside the actor
  if (userId === game.userId) {
    actor.update({
      system: {
        attributes: {
          resolve: {
            skills: {
              "-=attune": null,
            }
          },
        },
      }
    });
  }
});

